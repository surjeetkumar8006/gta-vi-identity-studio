import React, { useEffect, useState } from 'react';
import { ShieldAlert, Trophy, Star, ThumbsUp, X, RefreshCw } from 'lucide-react';
import { apiService, LeaderboardEntry, NetworkStats } from '../services/api';
import { soundFx } from '../utils/soundEffects';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile?: (shareId: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    const data = await apiService.getLeaderboard();
    const netStats = await apiService.getStats();
    setLeaderboard(data);
    setStats(netStats);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboardData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRespect = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundFx.playStarGain();
    const votes = await apiService.addRespect(id);
    if (votes !== null) {
      setLeaderboard(prev =>
        prev.map(item => (item.id === id ? { ...item, respect_votes: votes } : item))
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c0919] border border-vice-orange/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-[#140f2a] border-b border-vice-orange/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl bg-vice-orange/20 text-vice-orange border border-vice-orange/50">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xs sm:text-xl font-bold font-orbitron text-white tracking-wide flex items-center gap-1.5">
                VCPD MOST WANTED LEADERBOARD
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
                  LIVE API
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-400">Rankings powered by Vice City Backend & SQLite Database</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Global Network Stats Ribbon */}
        {stats && (
          <div className="px-3 sm:px-6 py-2 bg-[#070510] border-b border-white/10 grid grid-cols-3 text-center text-[10px] sm:text-xs font-mono">
            <div>
              <span className="text-slate-400">Empires: </span>
              <strong className="text-vice-pink font-bold">{stats.totalEmpires}</strong>
            </div>
            <div>
              <span className="text-slate-400">Bounty: </span>
              <strong className="text-vice-gold font-bold">${stats.totalBountyPool.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-400">Top District: </span>
              <strong className="text-vice-cyan font-bold truncate">{stats.topDistrict.toUpperCase()}</strong>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1 min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8 text-slate-400 gap-3">
              <RefreshCw className="w-7 h-7 animate-spin text-vice-orange" />
              <p className="text-xs">Fetching VCPD Database Leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <ShieldAlert className="w-10 h-10 text-vice-orange mx-auto opacity-50" />
              <p className="text-xs sm:text-sm font-bold text-white">No Published Criminal Empires Yet!</p>
              <p className="text-[11px] text-slate-400">Be the first to publish your character profile to the Vice City Network.</p>
            </div>
          ) : (
            leaderboard.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectProfile) {
                    soundFx.playClick();
                    onSelectProfile(item.id);
                    onClose();
                  }
                }}
                className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-vice-orange transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black font-orbitron text-xs sm:text-sm shrink-0 ${
                    index === 0 ? 'bg-vice-gold text-black shadow-md' :
                    index === 1 ? 'bg-slate-300 text-black' :
                    index === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    #{index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black">
                    <img
                      src={item.edited_photo_url || item.photo_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-bold text-white font-orbitron text-xs sm:text-sm group-hover:text-vice-orange transition-colors truncate">
                        {item.name.toUpperCase()} "{item.alias.toUpperCase()}"
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-vice-cyan/20 text-vice-cyan font-mono border border-vice-cyan/30 uppercase">
                        {item.role.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[10px] sm:text-xs text-slate-400 mt-0.5">
                      <span className="truncate">District: <strong className="text-white">{item.territory.toUpperCase()}</strong></span>
                      <span className="flex items-center gap-0.5 text-vice-gold shrink-0">
                        <Star className="w-3 h-3 fill-vice-gold" /> {item.wanted_stars}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Bounty & Respect Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="text-left sm:text-right">
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Bounty</div>
                    <div className="text-xs sm:text-sm font-black font-orbitron text-vice-gold">
                      ${item.bounty_amount.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleRespect(e, item.id)}
                    className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-vice-pink/20 hover:bg-vice-pink border border-vice-pink text-vice-pink hover:text-white transition-all text-xs font-bold flex items-center gap-1 shrink-0"
                    title="Give Respect (+1)"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{item.respect_votes || 0}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
