import React from 'react';
import { Sparkles, ShieldAlert, Palmtree, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface Step1LandingProps {
  onStart: () => void;
}

export const Step1Landing: React.FC<Step1LandingProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden py-8 sm:py-12">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-gradient-to-b from-vice-pink/15 via-vice-cyan/15 to-transparent blur-2xl" />
        <div className="absolute bottom-0 w-full flex justify-between px-4 sm:px-10 opacity-15 text-vice-pink">
          <Palmtree className="w-32 h-32 sm:w-48 sm:h-48 -rotate-12" />
          <Palmtree className="w-48 h-48 sm:w-64 sm:h-64 rotate-12 hidden md:block" />
        </div>
      </div>

      {/* Hero Badge */}
      <div className="relative z-10 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full bg-vice-pink/10 border border-vice-pink/30 text-vice-pink text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-center">
        <Sparkles className="w-3.5 h-3.5 text-vice-pink shrink-0" />
        <span>Build with React Image Editor Challenge 🎮</span>
      </div>

      {/* Main Title */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black font-orbitron tracking-tight leading-none text-white">
          VICE <span className="text-neon-pink">CITY</span>
        </h1>

        <div className="text-base sm:text-2xl md:text-3xl font-extrabold font-outfit uppercase text-slate-200 tracking-wider">
          YOUR STORY. <span className="text-neon-cyan">YOUR CITY.</span> <span className="text-neon-orange">YOUR RULES.</span>
        </div>

        <p className="text-slate-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed pt-1 sm:pt-2">
          Craft your custom criminal identity, customize your photo with <strong className="text-white">React Image Editor</strong>, build your empire, expand your territory, and generate shareable Profile Cards & Wanted Posters.
        </p>
      </div>

      {/* Main CTA Button - Full width on mobile */}
      <div className="relative z-10 mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none flex justify-center">
        <button
          onClick={() => {
            soundFx.playClick();
            onStart();
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-black font-orbitron text-base sm:text-lg tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-3 overflow-hidden shadow-md border border-white/20"
        >
          <div className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span>ENTER VICE CITY</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="relative z-10 mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full">
        <div className="vice-glass p-4 sm:p-5 rounded-2xl border border-vice-pink/30 flex items-start gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-xl bg-vice-pink/20 text-vice-pink shrink-0">
            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm">React Image Editor</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Crop, draw, apply Vice filters, stickers, text overlays & frames directly on your photo.
            </p>
          </div>
        </div>

        <div className="vice-glass-cyan p-4 sm:p-5 rounded-2xl border border-vice-cyan/30 flex items-start gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-xl bg-vice-cyan/20 text-vice-cyan shrink-0">
            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm">Wanted Poster Studio</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Generate custom VCPD Wanted Posters with dynamic bounty, stars & 2nd Image Editor pass.
            </p>
          </div>
        </div>

        <div className="vice-glass p-4 sm:p-5 rounded-2xl border border-vice-pink/30 flex items-start gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-xl bg-vice-orange/20 text-vice-orange shrink-0">
            <Palmtree className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm">Empire Territory</h3>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Claim Downtown, Vice Beach, or Port Gellhorn with night clubs, garages & supercars.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
