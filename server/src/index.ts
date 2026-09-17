import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Vice City Backend API', time: new Date().toISOString() });
});

// 1. Save / Publish Character Empire Profile
app.post('/api/profiles', (req, res) => {
  try {
    const p = req.body;
    if (!p.name || !p.alias) {
      return res.status(400).json({ error: 'Name and Alias are required' });
    }

    const shareId = nanoid(10);

    const stmt = db.prepare(`
      INSERT INTO profiles (
        id, name, alias, role, crew, custom_crew_name, motto,
        photo_url, edited_photo_url, wanted_edited_photo_url, active_style_preset,
        street_rep, money, influence, risk,
        territory, property, vehicle, bounty_amount, wanted_stars
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      shareId,
      p.name,
      p.alias,
      p.role || 'hustler',
      p.crew || 'solo',
      p.customCrewName || '',
      p.motto || '',
      p.photoUrl,
      p.editedPhotoUrl || null,
      p.wantedEditedPhotoUrl || null,
      p.activeStylePreset || 'vice_sunset',
      p.stats?.streetRep || 80,
      p.stats?.money || 70,
      p.stats?.influence || 85,
      p.stats?.risk || 75,
      p.territory || 'downtown',
      p.property || 'nightclub',
      p.vehicle || 'sports_car',
      p.bountyAmount || 500000,
      p.wantedStars || 5
    );

    res.json({
      success: true,
      shareId,
      message: 'Empire Profile published successfully to Vice City Network!',
    });
  } catch (err: unknown) {
    console.error('Error saving profile:', err);
    res.status(500).json({ error: 'Failed to publish empire profile' });
  }
});

// 2. Get Profile by Share ID
app.get('/api/profiles/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Increment view count
    db.prepare(`UPDATE profiles SET views_count = views_count + 1 WHERE id = ?`).run(id);

    const row = db.prepare(`SELECT * FROM profiles WHERE id = ?`).get(id) as Record<string, unknown> | undefined;

    if (!row) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      success: true,
      profile: {
        id: row.id,
        name: row.name,
        alias: row.alias,
        role: row.role,
        crew: row.crew,
        customCrewName: row.custom_crew_name,
        motto: row.motto,
        photoUrl: row.photo_url,
        editedPhotoUrl: row.edited_photo_url,
        wantedEditedPhotoUrl: row.wanted_edited_photo_url,
        activeStylePreset: row.active_style_preset,
        stats: {
          streetRep: row.street_rep,
          money: row.money,
          influence: row.influence,
          risk: row.risk,
        },
        territory: row.territory,
        property: row.property,
        vehicle: row.vehicle,
        bountyAmount: row.bounty_amount,
        wantedStars: row.wanted_stars,
        respectVotes: row.respect_votes,
        viewsCount: row.views_count,
        createdAt: row.created_at,
      },
    });
  } catch (err: unknown) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// 3. Get VCPD Top 10 Most Wanted Leaderboard
app.get('/api/leaderboard', (_req, res) => {
  try {
    const rows = db.prepare(`
      SELECT id, name, alias, role, crew, photo_url, edited_photo_url, bounty_amount, wanted_stars, territory, street_rep, respect_votes, views_count, created_at
      FROM profiles
      ORDER BY bounty_amount DESC, respect_votes DESC
      LIMIT 10
    `).all();

    res.json({
      success: true,
      leaderboard: rows,
    });
  } catch (err: unknown) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to retrieve leaderboard' });
  }
});

// 4. Add Respect / Upvote to Empire
app.post('/api/profiles/:id/like', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare(`UPDATE profiles SET respect_votes = respect_votes + 1 WHERE id = ?`).run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const updated = db.prepare(`SELECT respect_votes FROM profiles WHERE id = ?`).get(id) as { respect_votes: number };
    res.json({ success: true, respectVotes: updated.respect_votes });
  } catch (err: unknown) {
    console.error('Error liking profile:', err);
    res.status(500).json({ error: 'Failed to add respect vote' });
  }
});

// 5. Global Vice City Network Stats
app.get('/api/stats', (_req, res) => {
  try {
    const totalCount = (db.prepare(`SELECT COUNT(*) as count FROM profiles`).get() as { count: number }).count;
    const totalBounty = (db.prepare(`SELECT SUM(bounty_amount) as total FROM profiles`).get() as { total: number }).total || 0;
    const topTerritoryRow = db.prepare(`
      SELECT territory, COUNT(*) as count FROM profiles GROUP BY territory ORDER BY count DESC LIMIT 1
    `).get() as { territory: string } | undefined;

    res.json({
      success: true,
      totalEmpires: totalCount,
      totalBountyPool: totalBounty,
      topDistrict: topTerritoryRow ? topTerritoryRow.territory : 'Downtown Vice',
    });
  } catch (err: unknown) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

// Serve Frontend Static Files in Production (Unified 1-Deployment Option)
const distPath = path.join(__dirname, '../../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
  console.log('📦 Serving production frontend build from:', distPath);
}

app.listen(PORT, () => {
  console.log(`🚀 Vice City Backend Server listening on http://localhost:${PORT}`);
});
