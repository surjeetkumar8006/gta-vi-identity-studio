import React from 'react';
import { MapPin, Building2, Car, ArrowRight, ArrowLeft, Check } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-orange/10 border border-vice-orange/30 text-vice-orange text-xs font-bold uppercase tracking-widest">
          <Building2 className="w-3.5 h-3.5" /> Step 5: Build Your Vice Empire
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-orbitron text-white">
          CLAIM YOUR <span className="text-neon-orange">TERRITORY & ASSETS</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Select your primary district, headquarters property, and signature getaway vehicle.
        </p>
      </div>

      {/* 1. Territory Map Grid */}
      <div className="space-y-3">
        <h3 className="text-xs sm:text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-vice-pink" /> 1. Select Primary Territory:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TERRITORIES.map((t) => {
            const isSelected = profile.territory === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ territory: t.id as TerritoryId });
                }}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-vice-pink/20 border-vice-pink text-white font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs sm:text-sm font-orbitron">{t.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-vice-pink" />}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1">{t.tagline}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Danger: <strong className="text-vice-orange">{t.dangerLevel}</strong></span>
                  <span className="text-vice-cyan font-bold">{t.controlBonus}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Property Selector */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs sm:text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-vice-cyan" /> 2. Choose Headquarters Property:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {PROPERTIES.map((p) => {
            const isSelected = profile.property === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ property: p.id as PropertyId });
                }}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-vice-cyan/20 border-vice-cyan text-white font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs sm:text-sm font-orbitron">{p.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-vice-cyan" />}
                  </div>
                  <div className="text-[10px] font-bold text-vice-pink mt-0.5">{p.category}</div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5">{p.description}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-emerald-400 font-bold">
                  Daily Cash Flow: {p.income}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Vehicle Picker */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs sm:text-sm font-bold font-orbitron text-white flex items-center gap-2">
          <Car className="w-4 h-4 text-vice-gold" /> 3. Select Signature Getaway Vehicle:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {VEHICLES.map((v) => {
            const isSelected = profile.vehicle === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateProfile({ vehicle: v.id as VehicleId });
                }}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-vice-gold/20 border-vice-gold text-white font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs font-orbitron">{v.name}</h4>
                  {isSelected && <Check className="w-4 h-4 text-vice-gold" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{v.type}</div>
                <div className="text-[10px] sm:text-xs font-mono font-bold text-vice-gold mt-2">Top Speed: {v.topSpeed}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-white/10">
        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Reputation
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20 shadow-md"
        >
          <span>GENERATE CRIMINAL PROFILE & WANTED POSTER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
