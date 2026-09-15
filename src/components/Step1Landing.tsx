import React from 'react';
import { Sparkles, ShieldAlert, Palmtree, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface Step1LandingProps {
  onStart: () => void;
}

export const Step1Landing: React.FC<Step1LandingProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden py-12">
      
      {/* Background Synthwave Sun & Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Sun */}
        <div className="absolute top-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-b from-vice-pink via-vice-orange to-transparent opacity-30 blur-3xl" />
        {/* Palm tree background silhouettes */}
        <div className="absolute bottom-0 w-full flex justify-between px-10 opacity-20 text-vice-pink">
          <Palmtree className="w-48 h-48 -rotate-12" />
          <Palmtree className="w-64 h-64 rotate-12 hidden md:block" />
        </div>
      </div>

      {/* Hero Badge */}
      <div className="relative z-10 mb-6 px-4 py-1.5 rounded-full bg-vice-pink/15 border border-vice-pink/40 text-vice-pink text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(255,0,127,0.3)] animate-float">
        <Sparkles className="w-4 h-4 text-vice-pink" />
        <span>Build with React Image Editor Challenge 🎮</span>
      </div>

      {/* Main Title */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-orbitron tracking-tight leading-none text-white drop-shadow-[0_0_35px_rgba(255,0,127,0.5)]">
          VICE <span className="text-neon-pink">CITY</span>
        </h1>

        <div className="text-xl sm:text-3xl font-extrabold font-outfit uppercase text-slate-200 tracking-wider">
          YOUR STORY. <span className="text-neon-cyan">YOUR CITY.</span> <span className="text-neon-orange">YOUR RULES.</span>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed pt-2">
          Craft your custom criminal identity, customize your photo with <strong className="text-white">React Image Editor</strong>, build your empire, expand your territory, and generate shareable Profile Cards & Wanted Posters.
        </p>
      </div>

      {/* Main CTA */}
      <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => {
            soundFx.playClick();
            onStart();
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-black font-orbitron text-lg tracking-wider shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:shadow-[0_0_50px_rgba(0,240,255,0.8)] hover:scale-105 transition-all flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span>ENTER VICE CITY</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="vice-glass p-5 rounded-2xl border border-vice-pink/30 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-vice-pink/20 text-vice-pink">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">React Image Editor</h3>
            <p className="text-xs text-slate-400 mt-1">
              Crop, draw, apply Vice filters, stickers, text overlays & frames directly on your photo.
            </p>
          </div>
        </div>

        <div className="vice-glass-cyan p-5 rounded-2xl border border-vice-cyan/30 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-vice-cyan/20 text-vice-cyan">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Wanted Poster Studio</h3>
            <p className="text-xs text-slate-400 mt-1">
              Generate custom VCPD Wanted Posters with dynamic bounty, stars & 2nd Image Editor pass.
            </p>
          </div>
        </div>

        <div className="vice-glass p-5 rounded-2xl border border-vice-pink/30 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-vice-orange/20 text-vice-orange">
            <Palmtree className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Empire Territory</h3>
            <p className="text-xs text-slate-400 mt-1">
              Claim Downtown, Vice Beach, or Port Gellhorn with night clubs, garages & supercars.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
