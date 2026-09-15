import React from 'react';
import { MapPin, Building2, Car, Palmtree, ArrowRight, ArrowLeft, Check, Shield } from 'lucide-react';
import { CharacterProfile, TerritoryId, PropertyId, VehicleId } from '../types/empire';
import { TERRITORIES, PROPERTIES, VEHICLES } from '../utils/presets';
import { soundFx } from '../utils/soundEffects';

interface Step5EmpireBuilderProps {
  profile: CharacterProfile;
  onUpdateProfile: (updates: Partial<CharacterProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5EmpireBuilder: React.FC<Step5EmpireBuilderProps> = ({
  profile,
  onUpdateProfile,
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-orange/10 border border-vice-orange/30 text-vice-orange text-xs font-bold uppercase tracking-widest">
          <Building2 className="w-3.5 h-3.5" /> Step 5: Build Your Vice Empire
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white">
          CLAIM YOUR <span className="text-neon-orange">TERRITORY & ASSETS</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Select your primary district, headquarters property, and signature getaway vehicle.
        </p>
      </div>

      {/* 1. Territory Map Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-vice-pink" /> 1. Select Primary Territory:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TERRITORIES.map((t) => {
            const isSelected = profile.territory === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ territory: t.id as TerritoryId });
                }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-vice-pink/20 border-vice-pink text-white shadow-[0_0_25px_rgba(255,0,127,0.5)] scale-105'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm font-orbitron">{t.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-vice-pink" />}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{t.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Danger: <strong className="text-vice-orange">{t.dangerLevel}</strong></span>
                  <span className="text-vice-cyan font-bold">{t.controlBonus}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Property Selector */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-vice-cyan" /> 2. Choose Headquarters Property:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROPERTIES.map((p) => {
            const isSelected = profile.property === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ property: p.id as PropertyId });
                }}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-vice-cyan/20 border-vice-cyan text-white shadow-[0_0_25px_rgba(0,240,255,0.5)] scale-105'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm font-orbitron">{p.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-vice-cyan" />}
                  </div>
                  <div className="text-[10px] font-bold text-vice-pink mt-0.5">{p.category}</div>
                  <p className="text-xs text-slate-300 mt-2">{p.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-mono text-emerald-400 font-bold">
                  Daily Cash Flow: {p.income}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Vehicle Picker */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <Car className="w-4 h-4 text-vice-gold" /> 3. Select Signature Getaway Vehicle:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VEHICLES.map((v) => {
            const isSelected = profile.vehicle === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ vehicle: v.id as VehicleId });
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-vice-gold/20 border-vice-gold text-white shadow-[0_0_20px_rgba(255,215,0,0.5)] scale-105'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs font-orbitron">{v.name}</h4>
                  {isSelected && <Check className="w-4 h-4 text-vice-gold" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{v.type}</div>
                <div className="text-xs font-mono font-bold text-vice-gold mt-3">Top Speed: {v.topSpeed}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Reputation
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider shadow-[0_0_25px_rgba(255,0,127,0.6)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>GENERATE CRIMINAL PROFILE & WANTED POSTER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
