import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { Profile } from './models/Profile.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Vice City Backend API (MongoDB Atlas)', time: new Date().toISOString() });
});

// 1. Save / Publish Character Empire Profile
app.post('/api/profiles', async (req, res) => {
  try {
    const p = req.body;
    if (!p.name || !p.alias) {
      return res.status(400).json({ error: 'Name and Alias are required' });
    }

    const shareId = nanoid(10);

    const newProfile = new Profile({
      shareId,
      name: p.name,
      alias: p.alias,
      role: p.role || 'hustler',
      crew: p.crew || 'solo',
      customCrewName: p.customCrewName || '',
      motto: p.motto || '',
      photoUrl: p.photoUrl,
      editedPhotoUrl: p.editedPhotoUrl || null,
      wantedEditedPhotoUrl: p.wantedEditedPhotoUrl || null,
      activeStylePreset: p.activeStylePreset || 'vice_sunset',
      stats: {
        streetRep: p.stats?.streetRep || 80,
        money: p.stats?.money || 70,
        influence: p.stats?.influence || 85,
        risk: p.stats?.risk || 75,
      },
      territory: p.territory || 'downtown',
      property: p.property || 'nightclub',
      vehicle: p.vehicle || 'sports_car',
      bountyAmount: p.bountyAmount || 500000,
      wantedStars: p.wantedStars || 5,
    });

    await newProfile.save();

    res.json({
      success: true,
      shareId,
      message: 'Empire Profile published successfully to Vice City MongoDB Network!',
    });
  } catch (err: unknown) {
    console.error('Error saving profile to MongoDB:', err);
    res.status(500).json({ error: 'Failed to publish empire profile' });
  }
});

// 2. Get Profile by Share ID
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOneAndUpdate(
      { shareId: id },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      success: true,
      profile: {
        id: profile.shareId,
        name: profile.name,
        alias: profile.alias,
        role: profile.role,
        crew: profile.crew,
        customCrewName: profile.customCrewName,
        motto: profile.motto,
        photoUrl: profile.photoUrl,
        editedPhotoUrl: profile.editedPhotoUrl,
        wantedEditedPhotoUrl: profile.wantedEditedPhotoUrl,
        activeStylePreset: profile.activeStylePreset,
        stats: profile.stats,
        territory: profile.territory,
        property: profile.property,
        vehicle: profile.vehicle,
        bountyAmount: profile.bountyAmount,
        wantedStars: profile.wantedStars,
        respectVotes: profile.respectVotes,
        viewsCount: profile.viewsCount,
        createdAt: profile.createdAt,
      },
    });
  } catch (err: unknown) {
    console.error('Error fetching profile from MongoDB:', err);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// 3. Get VCPD Top 10 Most Wanted Leaderboard
app.get('/api/leaderboard', async (_req, res) => {
  try {
    const docs = await Profile.find()
      .sort({ bountyAmount: -1, respectVotes: -1 })
      .limit(10)
      .lean();

    const leaderboard = docs.map(doc => ({
      id: doc.shareId,
      name: doc.name,
      alias: doc.alias,
      role: doc.role,
      crew: doc.crew,
      photo_url: doc.photoUrl,
      edited_photo_url: doc.editedPhotoUrl,
      bounty_amount: doc.bountyAmount,
      wanted_stars: doc.wantedStars,
      territory: doc.territory,
      street_rep: doc.stats?.streetRep || 80,
      respect_votes: doc.respectVotes || 0,
      views_count: doc.viewsCount || 0,
      created_at: doc.createdAt,
    }));

    res.json({
      success: true,
      leaderboard,
    });
  } catch (err: unknown) {
    console.error('Error fetching leaderboard from MongoDB:', err);
    res.status(500).json({ error: 'Failed to retrieve leaderboard' });
  }
});

// 4. Add Respect / Upvote to Empire
app.post('/api/profiles/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOneAndUpdate(
      { shareId: id },
      { $inc: { respectVotes: 1 } },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ success: true, respectVotes: profile.respectVotes });
  } catch (err: unknown) {
    console.error('Error liking profile in MongoDB:', err);
    res.status(500).json({ error: 'Failed to add respect vote' });
  }
});

// 5. Global Vice City Network Stats
app.get('/api/stats', async (_req, res) => {
  try {
    const totalCount = await Profile.countDocuments();
    const bountyResult = await Profile.aggregate([
      { $group: { _id: null, total: { $sum: '$bountyAmount' } } }
    ]);
    const topTerritoryResult = await Profile.aggregate([
      { $group: { _id: '$territory', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const totalBountyPool = bountyResult.length > 0 ? bountyResult[0].total : 0;
    const topDistrict = topTerritoryResult.length > 0 ? topTerritoryResult[0]._id : 'Downtown Vice';

    res.json({
      success: true,
      totalEmpires: totalCount,
      totalBountyPool,
      topDistrict,
    });
  } catch (err: unknown) {
    console.error('Error fetching stats from MongoDB:', err);
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
