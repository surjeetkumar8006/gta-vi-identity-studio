import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'vice_city.db');
export const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    alias TEXT NOT NULL,
    role TEXT NOT NULL,
    crew TEXT NOT NULL,
    custom_crew_name TEXT,
    motto TEXT,
    photo_url TEXT NOT NULL,
    edited_photo_url TEXT,
    wanted_edited_photo_url TEXT,
    active_style_preset TEXT NOT NULL,
    street_rep INTEGER NOT NULL,
    money INTEGER NOT NULL,
    influence INTEGER NOT NULL,
    risk INTEGER NOT NULL,
    territory TEXT NOT NULL,
    property TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    bounty_amount INTEGER NOT NULL,
    wanted_stars INTEGER NOT NULL,
    respect_votes INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('✅ SQLite Database initialized at:', dbPath);
