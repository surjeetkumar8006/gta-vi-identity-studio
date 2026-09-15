import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Award, Palmtree, ArrowRight, ArrowLeft, Star, Edit3 } from 'lucide-react';
import { CharacterProfile } from '../types/empire';
import { TERRITORIES, PROPERTIES, VEHICLES, STYLE_PRESETS } from '../utils/presets';
import { UnlayerEditorModal } from './UnlayerEditorModal';
import { soundFx } from '../utils/soundEffects';

interface Step6ProfileCardsProps {
  profile: CharacterProfile;
  onUpdateProfile: (updates: Partial<CharacterProfile>) => void;
  onNext: () => void;
  onBack: () => void;
  profileRef?: React.RefObject<HTMLDivElement | null>;
  wantedRef?: React.RefObject<HTMLDivElement | null>;
}

export const Step6ProfileCards: React.FC<Step6ProfileCardsProps> = ({
  profile,
  onUpdateProfile,
  onNext,
  onBack,
  profileRef,
  wantedRef,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'wanted'>('profile');
  const [isWantedEditorOpen, setIsWantedEditorOpen] = useState(false);

  const territoryObj = TERRITORIES.find(t => t.id === profile.territory) || TERRITORIES[0];
  const propertyObj = PROPERTIES.find(p => p.id === profile.property) || PROPERTIES[0];
  const vehicleObj = VEHICLES.find(v => v.id === profile.vehicle) || VEHICLES[0];
  const currentStylePreset = STYLE_PRESETS.find(p => p.id === profile.activeStylePreset) || STYLE_PRESETS[0];

  const mainPhoto = profile.editedPhotoUrl || profile.photoUrl;
  const wantedPhoto = profile.wantedEditedPhotoUrl || mainPhoto;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-pink/15 border border-vice-pink/40 text-vice-pink text-xs font-bold uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" /> Step 6: Generated Profile & Wanted Card
        </div>
        <h2 className="text-2xl sm:text-5xl font-black font-orbitron text-white">
          YOUR <span className="text-neon-pink">VICE CITY STORY</span> IS READY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Preview your high-definition Criminal Profile Card and VCPD Most Wanted Poster.
        </p>
      </div>

      {/* Card Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTab('profile');
          }}
          className={`w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-black font-orbitron text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-vice-pink text-white shadow-md'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/15'
          }`}
        >
          <Award className="w-4 h-4" /> 1. CRIMINAL PROFILE CARD
        </button>

        <button
          onClick={() => {
            soundFx.playStarGain();
            setActiveTab('wanted');
          }}
          className={`w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-black font-orbitron text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeTab === 'wanted'
              ? 'bg-vice-orange text-white shadow-md'
              : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/15'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-vice-orange" /> 2. VCPD MOST WANTED POSTER
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="flex flex-col items-center justify-center min-h-[450px]">
        
        {/* CARD 1: CRIMINAL PROFILE CARD */}
        {activeTab === 'profile' && (
          <div className="w-full flex flex-col items-center gap-4">
            <div
              ref={profileRef}
              className="relative w-full max-w-[340px] sm:max-w-md bg-gradient-to-b from-[#140f2a] via-[#090714] to-[#12071f] border border-vice-pink/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden font-sans space-y-4 sm:space-y-5"
            >
              {/* Card Watermark */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-vice-pink">
                <Palmtree className="w-36 h-36 sm:w-48 sm:h-48" />
              </div>

              {/* Top Banner */}
              <div className="flex items-center justify-between border-b border-vice-pink/30 pb-2.5">
                <div>
                  <h3 className="font-orbitron font-black text-xl sm:text-2xl text-white tracking-widest">
                    VICE <span className="text-neon-pink">CITY</span>
                  </h3>
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-vice-cyan">
                    STATE OF LEONIDA SYNDICATE PASS
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-vice-pink/20 text-vice-pink font-mono text-[9px] sm:text-[10px] font-bold border border-vice-pink/40">
                  ID #{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              {/* Photo & Main Identity */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-vice-pink bg-black shrink-0">
                  <img
                    src={mainPhoto}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    style={{ filter: currentStylePreset.filterEffect }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 py-0.5 text-center text-[7px] sm:text-[8px] font-mono text-vice-cyan">
                    VERIFIED
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-black font-orbitron text-white leading-tight truncate">
                    {profile.name.toUpperCase()}
                  </h4>
                  <div className="text-xs sm:text-sm font-extrabold text-vice-pink tracking-wide truncate">
                    "{profile.alias.toUpperCase()}"
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded bg-vice-cyan/20 text-vice-cyan font-mono text-[9px] sm:text-[10px] font-bold border border-vice-cyan/30 uppercase">
                    {profile.role.replace('_', ' ')}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Crew: <strong className="text-white">{profile.crew === 'syndicate' ? profile.customCrewName : profile.crew.toUpperCase()}</strong>
                  </div>
                </div>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 text-[9px] sm:text-[10px]">STREET REP:</span>
                  <div className="font-mono font-bold text-vice-pink text-xs sm:text-sm">{profile.stats.streetRep} / 100</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] sm:text-[10px]">INFLUENCE:</span>
                  <div className="font-mono font-bold text-vice-cyan text-xs sm:text-sm">{profile.stats.influence} / 100</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] sm:text-[10px]">CASH FLOW:</span>
                  <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm">{profile.stats.money} / 100</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] sm:text-[10px]">RISK RATING:</span>
                  <div className="font-mono font-bold text-vice-orange text-xs sm:text-sm">{profile.stats.risk} / 100</div>
                </div>
              </div>

              {/* Empire Assets */}
              <div className="space-y-1 text-xs border-t border-white/10 pt-2.5">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[10px] sm:text-[11px]">TERRITORY:</span>
                  <strong className="text-vice-pink font-orbitron text-[11px] sm:text-xs truncate">{territoryObj.name}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[10px] sm:text-[11px]">HEADQUARTERS:</span>
                  <strong className="text-vice-cyan font-orbitron text-[11px] sm:text-xs truncate">{propertyObj.name}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400 text-[10px] sm:text-[11px]">VEHICLE:</span>
                  <strong className="text-vice-gold font-orbitron text-[11px] sm:text-xs truncate">{vehicleObj.name}</strong>
                </div>
              </div>

              {/* Motto Footer */}
              <div className="bg-vice-pink/10 border border-vice-pink/30 p-2 sm:p-2.5 rounded-xl text-center text-[11px] sm:text-xs text-slate-200 italic">
                "{profile.motto || 'Never trust the night.'}"
              </div>

              <div className="text-center text-[8px] sm:text-[9px] font-mono text-slate-500 tracking-widest pt-0.5">
                VICE CITY SYNDICATE • #BUILTWITHIMAGEEDITOR
              </div>
            </div>
          </div>
        )}

        {/* CARD 2: VCPD MOST WANTED POSTER */}
        {activeTab === 'wanted' && (
          <div className="w-full flex flex-col items-center gap-4">
            
            {/* Wanted Poster Settings */}
            <div className="w-full max-w-[340px] sm:max-w-md bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">Wanted Stars:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        soundFx.playStarGain();
                        onUpdateProfile({ wantedStars: s });
                      }}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          s <= profile.wantedStars ? 'text-vice-gold fill-vice-gold' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsWantedEditorOpen(true);
                }}
                className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-vice-orange/20 border border-vice-orange text-vice-orange font-bold text-xs hover:bg-vice-orange hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Wanted Mugshot
              </button>
            </div>

            <div
              ref={wantedRef}
              className="relative w-full max-w-[340px] sm:max-w-md bg-[#161009] border-2 border-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden font-sans space-y-3 sm:space-y-4 text-center"
            >
              {/* Header */}
              <div className="bg-amber-600 text-black py-1.5 sm:py-2 rounded-xl font-orbitron font-black text-2xl sm:text-3xl tracking-widest shadow-inner">
                WANTED
              </div>

              <div className="text-[10px] sm:text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                VICE CITY POLICE DEPARTMENT • ARREST ON SIGHT
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 py-0.5">
                {Array.from({ length: profile.wantedStars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-vice-gold fill-vice-gold animate-bounce" />
                ))}
              </div>

              {/* Mugshot Image */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden border-2 sm:border-4 border-amber-600/80 bg-black shadow-2xl">
                <img
                  src={wantedPhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover filter contrast-125 sepia-20"
                />
                <div className="absolute inset-0 bg-red-600/10 pointer-events-none" />
                <div className="absolute bottom-1.5 left-2 right-2 bg-black/80 py-0.5 text-[8px] sm:text-[9px] font-mono text-amber-400 font-bold">
                  CASE #{Math.floor(10000 + Math.random() * 90000)}
                </div>
              </div>

              {/* Name & Bounty */}
              <div className="space-y-0.5">
                <h3 className="font-orbitron font-black text-xl sm:text-2xl text-amber-100 truncate">
                  {profile.name.toUpperCase()} "{profile.alias.toUpperCase()}"
                </h3>
                <div className="text-[11px] sm:text-xs font-semibold text-amber-400/80">
                  Role: {profile.role.toUpperCase()}
                </div>
              </div>

              {/* Reward Banner */}
              <div className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-black py-2 px-3 sm:px-4 rounded-xl shadow-md">
                <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">BOUNTY REWARD</div>
                <div className="font-orbitron font-black text-2xl sm:text-3xl tracking-wider">
                  ${profile.bountyAmount.toLocaleString()}
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-amber-200/80 font-mono pt-0.5">
                LAST SEEN: <strong className="text-white">{territoryObj.name.toUpperCase()}</strong>
              </div>

              <div className="text-[8px] sm:text-[9px] text-amber-600 font-mono tracking-widest pt-1.5 border-t border-amber-900/50">
                OFFICIAL VCPD WANTED NOTICE • #BUILTWITHIMAGEEDITOR
              </div>
            </div>

          </div>
        )}

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
          <ArrowLeft className="w-4 h-4" /> Back to Empire
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20 shadow-md"
        >
          <span>PROCEED TO DOWNLOAD & SHARE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Standalone Wanted Mugshot Unlayer Editor Modal */}
      <UnlayerEditorModal
        isOpen={isWantedEditorOpen}
        onClose={() => setIsWantedEditorOpen(false)}
        imageUrl={mainPhoto}
        title="VCPD Wanted Poster Mugshot Editor"
        onSaveImage={(newUrl) => {
          onUpdateProfile({ wantedEditedPhotoUrl: newUrl });
        }}
      />

    </div>
  );
};
