import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, RotateCcw } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { soundFx } from '../utils/soundEffects';

interface NavbarProps {
  currentStep: number;
  totalSteps: number;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onReset }) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFx.playClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080512]/90 backdrop-blur-xl border-b border-vice-pink/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-vice-pink to-vice-cyan p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.5)]">
            <div className="w-full h-full bg-[#090714] rounded-[10px] flex items-center justify-center text-vice-pink font-black text-sm">
              <Flame className="w-5 h-5 text-vice-pink animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-black text-lg text-white tracking-wider">
                VICE<span className="text-vice-pink">CITY</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-vice-pink/20 text-vice-pink border border-vice-pink/40">
                EMPIRE STUDIO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden md:block">
              Powered by <span className="text-vice-cyan">React Image Editor</span>
            </p>
          </div>
        </div>

        {/* Center Hashtag Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-vice-cyan/10 border border-vice-cyan/30 text-vice-cyan text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>#BuiltWithImageEditor Challenge</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {currentStep > 1 && (
            <button
              onClick={() => {
                soundFx.playClick();
                onReset();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10"
              title="Reset Empire"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
              isMuted
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-vice-cyan/10 text-vice-cyan border-vice-cyan/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/surjeetkumar8006/gta-vi-identity-studio"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/15 transition-all"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
};
