import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles, ThumbsUp, Eye, ShieldAlert, Share2, Copy, Check } from 'lucide-react';
import { apiService } from '../services/api';
import { CharacterProfile } from '../types/empire';
import { Step6ProfileCards } from './Step6ProfileCards';
import { soundFx } from '../utils/soundEffects';

interface PublicProfileViewProps {
  shareId: string;
  onClose: () => void;
}

export const PublicProfileView: React.FC<PublicProfileViewProps> = ({ shareId, onClose }) => {
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [respectVotes, setRespectVotes] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await apiService.getProfile(shareId);
      if (res.success && res.profile) {
        setProfile(res.profile);
        setRespectVotes(res.profile.respectVotes || 0);
        setViewsCount(res.profile.viewsCount || 0);
      }
      setLoading(false);
    }
    loadData();
  }, [shareId]);

  const handleLike = async () => {
    soundFx.playStarGain();
    const votes = await apiService.addRespect(shareId);
    if (votes !== null) {
      setRespectVotes(votes);
    }
  };

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Sparkles className="w-10 h-10 animate-spin text-vice-pink" />
        <p className="text-sm font-bold text-white font-orbitron">Loading Published Empire Profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold font-orbitron text-white">PROFILE NOT FOUND</h2>
        <p className="text-xs text-slate-400">The requested Vice City empire profile could not be retrieved.</p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-vice-pink text-white font-bold text-xs"
        >
          Return to Identity Studio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Studio
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-xl">
            <Eye className="w-4 h-4 text-vice-cyan" /> {viewsCount} Views
          </div>

          <button
            onClick={handleLike}
            className="px-4 py-2 rounded-xl bg-vice-pink/20 hover:bg-vice-pink border border-vice-pink text-vice-pink hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <ThumbsUp className="w-4 h-4" /> Respect ({respectVotes})
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-vice-cyan/20 hover:bg-vice-cyan border border-vice-cyan text-vice-cyan hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Share Profile'}</span>
          </button>
        </div>
      </div>

      {/* Render Cards */}
      <Step6ProfileCards
        profile={profile}
        onUpdateProfile={() => {}}
        onNext={() => {}}
        onBack={onClose}
      />
    </div>
  );
};
