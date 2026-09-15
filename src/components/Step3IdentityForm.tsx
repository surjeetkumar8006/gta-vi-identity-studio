import React from 'react';
import { UserCheck, Shield, Award, Sparkles, ArrowRight, ArrowLeft, Zap, Car, Laptop, Bike, Briefcase } from 'lucide-react';
import { CharacterProfile, RoleType, CrewType } from '../types/empire';
import { soundFx } from '../utils/soundEffects';

interface Step3IdentityFormProps {
  profile: CharacterProfile;
  onUpdateProfile: (updates: Partial<CharacterProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ROLES: { id: RoleType; name: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'street_racer', name: 'Street Racer', icon: <Car className="w-5 h-5 text-vice-cyan" />, desc: 'Midnight Drag & Circuit Races' },
  { id: 'hustler', name: 'Vice Hustler', icon: <Zap className="w-5 h-5 text-vice-pink" />, desc: 'Street Smarts & Underground Deals' },
  { id: 'entrepreneur', name: 'Syndicate Mogul', icon: <Briefcase className="w-5 h-5 text-vice-gold" />, desc: 'Front Businesses & Wealth' },
  { id: 'hacker', name: 'Cyber Ghost', icon: <Laptop className="w-5 h-5 text-purple-400" />, desc: 'Bank Security Bypass' },
  { id: 'biker', name: 'Outlaw Biker', icon: <Bike className="w-5 h-5 text-vice-orange" />, desc: 'Enforcer & Smuggling Crew' },
];

const CREWS: { id: CrewType; name: string; desc: string }[] = [
  { id: 'solo', name: 'Solo Lone Wolf', desc: 'No alliances. 100% cut of profits.' },
  { id: 'night_riders', name: 'Night Riders Crew', desc: 'High-speed getaways & racing dominance.' },
  { id: 'vice_kings', name: 'Vice Kings Syndicate', desc: 'Controls Ocean Drive nightlife & protection.' },
  { id: 'syndicate', name: 'Custom Syndicate', desc: 'Build your own custom crew name.' },
];

export const Step3IdentityForm: React.FC<Step3IdentityFormProps> = ({
  profile,
  onUpdateProfile,
  onNext,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-cyan/10 border border-vice-cyan/30 text-vice-cyan text-xs font-bold uppercase tracking-widest">
          <UserCheck className="w-3.5 h-3.5" /> Step 3: Character Identity
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-orbitron text-white">
          BUILD YOUR <span className="text-neon-cyan">IDENTITY & ALIAS</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Define your character persona, underground alias, criminal role, crew, and personal motto.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="vice-glass p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-vice-pink/30 space-y-6 sm:space-y-8">
        
        {/* Name & Alias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[11px] sm:text-xs font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Character Real Name</span>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdateProfile({ name: e.target.value })}
              placeholder="e.g. Alex"
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#090714] border border-white/15 focus:border-vice-pink text-white font-bold text-xs sm:text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[11px] sm:text-xs font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-vice-pink" />
              <span>Street Alias / Code Name</span>
            </label>
            <input
              type="text"
              value={profile.alias}
              onChange={(e) => onUpdateProfile({ alias: e.target.value })}
              placeholder='e.g. "The Ghost"'
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#090714] border border-vice-pink/50 text-vice-pink font-extrabold text-xs sm:text-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Role Selector */}
        <div className="space-y-3">
          <label className="text-[11px] sm:text-xs font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-vice-cyan" />
            <span>Select Criminal Specialization (Role)</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {ROLES.map((r) => {
              const isSelected = profile.role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    soundFx.playClick();
                    onUpdateProfile({ role: r.id });
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-vice-cyan/20 border-vice-cyan text-white shadow-md scale-105 font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="mb-2">{r.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-white">{r.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{r.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Crew Selection */}
        <div className="space-y-3">
          <label className="text-[11px] sm:text-xs font-bold font-orbitron text-white uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-vice-orange" />
            <span>Select Syndicate / Crew Affiliation</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {CREWS.map((c) => {
              const isSelected = profile.crew === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFx.playClick();
                    onUpdateProfile({ crew: c.id });
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-vice-pink/20 border-vice-pink text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 sm:mt-1">{c.desc}</div>
                </button>
              );
            })}
          </div>

          {profile.crew === 'syndicate' && (
            <div className="pt-2">
              <input
                type="text"
                value={profile.customCrewName}
                onChange={(e) => onUpdateProfile({ customCrewName: e.target.value })}
                placeholder="Enter custom syndicate name..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090714] border border-vice-pink text-white font-semibold text-xs focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Motto Input */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[11px] sm:text-xs font-bold font-orbitron text-white uppercase tracking-wider">
            Personal Motto / Quote
          </label>
          <input
            type="text"
            value={profile.motto}
            onChange={(e) => onUpdateProfile({ motto: e.target.value })}
            placeholder='e.g. "Never trust the night."'
            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#090714] border border-white/15 text-white font-medium text-xs focus:outline-none focus:border-vice-cyan"
          />
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
          <ArrowLeft className="w-4 h-4" /> Back to Character Visual
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20 shadow-md"
        >
          <span>BUILD REPUTATION & STATS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
