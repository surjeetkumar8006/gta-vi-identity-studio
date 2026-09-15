import { CharacterProfile } from '../types/empire';

const API_BASE = 'http://localhost:5000/api';

export interface LeaderboardEntry {
  id: string;
  name: string;
  alias: string;
  role: string;
  crew: string;
  photo_url: string;
  edited_photo_url?: string;
  bounty_amount: number;
  wanted_stars: number;
  territory: string;
  street_rep: number;
  respect_votes: number;
  views_count: number;
  created_at: string;
}

export interface NetworkStats {
  totalEmpires: number;
  totalBountyPool: number;
  topDistrict: string;
}

export const apiService = {
  // Check backend server health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Publish profile to backend database
  async publishProfile(profile: CharacterProfile): Promise<{ success: boolean; shareId?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish');
      return data;
    } catch (err: unknown) {
      console.error('Publish API error:', err);
      return { success: false, error: (err as Error).message };
    }
  },

  // Fetch published profile by shareId
  async getProfile(shareId: string): Promise<{ success: boolean; profile?: CharacterProfile & { respectVotes: number; viewsCount: number }; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/profiles/${shareId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');
      return data;
    } catch (err: unknown) {
      console.error('Get profile API error:', err);
      return { success: false, error: (err as Error).message };
    }
  },

  // Get Top 10 Most Wanted Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const res = await fetch(`${API_BASE}/leaderboard`);
      const data = await res.json();
      return data.leaderboard || [];
    } catch (err: unknown) {
      console.error('Leaderboard API error:', err);
      return [];
    }
  },

  // Add Respect / Upvote to Profile
  async addRespect(shareId: string): Promise<number | null> {
    try {
      const res = await fetch(`${API_BASE}/profiles/${shareId}/like`, { method: 'POST' });
      const data = await res.json();
      return data.respectVotes ?? null;
    } catch (err: unknown) {
      console.error('Add respect API error:', err);
      return null;
    }
  },

  // Get Vice City Network Stats
  async getStats(): Promise<NetworkStats | null> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      return data;
    } catch {
      return null;
    }
  },
};
