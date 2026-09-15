import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, Share2, Copy, RotateCcw, Check, Sparkles, ExternalLink } from 'lucide-react';
import { GithubIcon, TwitterIcon } from './SocialIcons';
import { toPng, toJpeg } from 'html-to-image';
import { CharacterProfile } from '../types/empire';
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
  const [copied, setCopied] = React.useState(false);

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

  const shareText = `Check out my Vice City Criminal Empire profile! Built with @unlayerhq React Image Editor 🎮 #BuiltWithImageEditor\nhttps://github.com/surjeetkumar8006/gta-vi-identity-studio`;

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
          Download high-definition PNG/JPEG assets or share your build with the <strong className="text-vice-cyan">#BuiltWithImageEditor</strong> community.
        </p>
      </div>

      {/* Main Actions Box */}
      <div className="vice-glass p-8 rounded-3xl border border-vice-pink/40 space-y-8 shadow-[0_0_50px_rgba(255,0,127,0.3)]">
        
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
