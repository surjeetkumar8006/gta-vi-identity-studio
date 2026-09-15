import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, RotateCcw, Check, Sparkles, ExternalLink, Globe, UploadCloud } from 'lucide-react';
import { GithubIcon, TwitterIcon } from './SocialIcons';
import { toPng, toJpeg } from 'html-to-image';
import { CharacterProfile } from '../types/empire';
import { apiService } from '../services/api';
import { soundFx } from '../utils/soundEffects';

interface Step7ShareExportProps {
  profile: CharacterProfile;
  onReset: () => void;
  profileRef: React.RefObject<HTMLDivElement | null>;
  wantedRef: React.RefObject<HTMLDivElement | null>;
}

export const Step7ShareExport: React.FC<Step7ShareExportProps> = ({
  profile,
  onReset,
  profileRef,
  wantedRef,
}) => {
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedShareId, setPublishedShareId] = useState<string | null>(null);

  useEffect(() => {
    soundFx.playSuccess();
    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#00f0ff', '#ff8a00', '#ffd700'],
    });
  }, []);

  const downloadCard = async (type: 'profile' | 'wanted', format: 'png' | 'jpeg') => {
    soundFx.playClick();
    const node = type === 'profile' ? profileRef.current : wantedRef.current;
    if (!node) return;

    try {
      const dataUrl = format === 'png' 
        ? await toPng(node, { cacheBust: true, pixelRatio: 2 })
        : await toJpeg(node, { cacheBust: true, quality: 0.95, pixelRatio: 2 });

      const link = document.createElement('a');
      link.download = `vice-city-${type}-${profile.name.toLowerCase()}.${format}`;
      link.href = dataUrl;
      link.click();
      soundFx.playSuccess();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handlePublishBackend = async () => {
    soundFx.playClick();
    setPublishing(true);
    const res = await apiService.publishProfile(profile);
    setPublishing(false);

    if (res.success && res.shareId) {
      soundFx.playSuccess();
      setPublishedShareId(res.shareId);
    }
  };

  const shareUrl = publishedShareId 
    ? `${window.location.origin}/?shareId=${publishedShareId}`
    : `https://github.com/surjeetkumar8006/gta-vi-identity-studio`;

  const shareText = `Check out my Vice City Criminal Empire profile! Built with @unlayerhq React Image Editor 🎮 #BuiltWithImageEditor\n${shareUrl}`;

  const copyToClipboard = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-center">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Empire Creation Complete!
        </div>
        <h2 className="text-4xl sm:text-6xl font-black font-orbitron text-white">
          YOUR VICE CITY <span className="text-neon-pink">EMPIRE IS READY</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Download high-definition assets or publish your empire to the <strong className="text-vice-cyan">Vice City Backend Database</strong> & Leaderboard.
        </p>
      </div>

      {/* Main Actions Box */}
      <div className="vice-glass p-8 rounded-3xl border border-vice-pink/40 space-y-8 shadow-[0_0_50px_rgba(255,0,127,0.3)]">
        
        {/* Backend Publish Section */}
        <div className="bg-gradient-to-r from-vice-pink/20 via-purple-900/30 to-vice-cyan/20 p-6 rounded-2xl border border-vice-pink/40 space-y-3">
          <h3 className="text-sm font-bold font-orbitron text-white flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-vice-cyan" /> PUBLISH TO VICE CITY NETWORK & LEADERBOARD
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Saves your profile card & wanted poster to the Express REST API backend database, allowing anyone to view, share & upvote your empire.
          </p>

          <div className="pt-2">
            {publishedShareId ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-mono">
                <span className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Published! Share ID: {publishedShareId}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 rounded-xl bg-vice-cyan text-black font-bold flex items-center gap-1 hover:bg-white"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Permalink
                </button>
              </div>
            ) : (
              <button
                onClick={handlePublishBackend}
                disabled={publishing}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-vice-cyan via-blue-600 to-vice-pink text-white font-black font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <UploadCloud className="w-4 h-4 animate-bounce" />
                <span>{publishing ? 'Publishing to Database...' : 'PUBLISH EMPIRE TO BACKEND'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Download Buttons */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold font-orbitron text-slate-300 uppercase tracking-widest">
            Export High-Resolution Assets:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => downloadCard('profile', 'png')}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-vice-pink to-purple-600 text-white font-bold font-orbitron text-sm shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD PROFILE CARD (PNG)</span>
            </button>

            <button
              onClick={() => downloadCard('wanted', 'png')}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-vice-orange to-yellow-600 text-white font-bold font-orbitron text-sm shadow-[0_0_20px_rgba(255,138,0,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>DOWNLOAD WANTED POSTER (PNG)</span>
            </button>
          </div>
        </div>

        {/* Social Share Section */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <h3 className="text-xs font-bold font-orbitron text-slate-300 uppercase tracking-widest">
            Share on Social & Challenge Submission:
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <TwitterIcon className="w-4 h-4" />
              <span>Tweet #BuiltWithImageEditor</span>
            </a>

            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/15"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Share Text!' : 'Copy Share Text'}</span>
            </button>
          </div>
        </div>

        {/* Unlayer Official Challenge Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <a
            href="https://github.com/unlayer/react-image-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-vice-cyan flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" /> unlayer/react-image-editor
          </a>

          <a
            href="https://github.com/surjeetkumar8006/gta-vi-identity-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-vice-pink flex items-center gap-1.5 transition-colors font-bold text-white"
          >
            <ExternalLink className="w-4 h-4 text-vice-pink" /> View Source Code on GitHub
          </a>
        </div>

      </div>

      {/* Start Over Button */}
      <div className="pt-4">
        <button
          onClick={() => {
            soundFx.playClick();
            onReset();
          }}
          className="px-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-300 font-bold font-orbitron text-xs flex items-center gap-2 mx-auto transition-all border border-white/10"
        >
          <RotateCcw className="w-4 h-4 text-vice-pink" />
          <span>CREATE ANOTHER CHARACTER EMPIRE</span>
        </button>
      </div>

    </div>
  );
};
