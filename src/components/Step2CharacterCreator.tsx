import React, { useState } from 'react';
import { Upload, Sparkles, Wand2, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { CharacterProfile } from '../types/empire';
import { CHARACTER_PRESETS, STYLE_PRESETS } from '../utils/presets';
import { UnlayerEditorModal } from './UnlayerEditorModal';
import { soundFx } from '../utils/soundEffects';

interface Step2CharacterCreatorProps {
  profile: CharacterProfile;
  onUpdateProfile: (updates: Partial<CharacterProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2CharacterCreator: React.FC<Step2CharacterCreatorProps> = ({
  profile,
  onUpdateProfile,
  onNext,
  onBack,
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          onUpdateProfile({ photoUrl: url, editedPhotoUrl: null });
          soundFx.playSuccess();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetAvatar = (avatarUrl: string) => {
    soundFx.playClick();
    onUpdateProfile({ photoUrl: avatarUrl, editedPhotoUrl: null });
  };

  const handleSelectStylePreset = (presetId: string) => {
    soundFx.playClick();
    onUpdateProfile({ activeStylePreset: presetId });
  };

  const currentStylePreset = STYLE_PRESETS.find(p => p.id === profile.activeStylePreset) || STYLE_PRESETS[0];
  const displayPhoto = profile.editedPhotoUrl || profile.photoUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-pink/10 border border-vice-pink/30 text-vice-pink text-xs font-bold uppercase tracking-widest">
          <Wand2 className="w-3.5 h-3.5" /> Step 2: Character Visual Creator
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white">
          CUSTOMIZE YOUR <span className="text-neon-pink">CHARACTER VISUAL</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Upload your photo or select a character preset, then edit it using <strong className="text-vice-cyan">React Image Editor</strong>.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Preview + Image Editor trigger */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-4">
          
          {/* Card Frame with Filter applied */}
          <div className="relative w-full max-w-sm aspect-square rounded-3xl p-3 bg-gradient-to-b from-vice-pink/40 to-vice-cyan/40 shadow-[0_0_40px_rgba(255,0,127,0.3)]">
            <div className="relative w-full h-full rounded-2xl bg-[#090714] overflow-hidden flex items-center justify-center border border-white/10">
              
              <img
                src={displayPhoto}
                alt="Character Avatar"
                className="w-full h-full object-cover transition-all duration-300"
                style={{ filter: currentStylePreset.filterEffect }}
              />

              {/* Badge overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-vice-pink/50 text-vice-pink font-bold text-[10px] tracking-widest uppercase">
                {currentStylePreset.badge}
              </div>

              {profile.editedPhotoUrl && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/80 text-white font-bold text-[10px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Edited with Unlayer
                </div>
              )}
            </div>
          </div>

          {/* Trigger React Image Editor Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setIsEditorOpen(true);
            }}
            className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-gradient-to-r from-vice-pink via-purple-600 to-vice-cyan text-white font-bold font-orbitron text-sm tracking-wide shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-vice-cyan animate-spin" />
            <span>LAUNCH REACT IMAGE EDITOR</span>
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            Applies Unlayer crop, draw, stickers, text overlays, frames, and filters.
          </p>
        </div>

        {/* Right Column: Upload Custom Photo + Avatar Presets + Style Selector */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Upload Box */}
          <div className="vice-glass p-5 rounded-2xl border border-vice-pink/30 space-y-3">
            <h3 className="text-sm font-bold font-orbitron text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-vice-pink" /> Upload Custom Photo
            </h3>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/20 hover:border-vice-pink rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
              <Upload className="w-6 h-6 text-slate-400 mb-1" />
              <span className="text-xs font-semibold text-slate-300">Click to upload image (JPG, PNG, WebP)</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Preset Avatars */}
          <div className="vice-glass p-5 rounded-2xl border border-vice-cyan/30 space-y-3">
            <h3 className="text-sm font-bold font-orbitron text-white">
              Or Choose a Character Preset:
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {CHARACTER_PRESETS.map((cp) => {
                const isSelected = profile.photoUrl === cp.avatar;
                return (
                  <button
                    key={cp.id}
                    onClick={() => handleSelectPresetAvatar(cp.avatar)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-vice-cyan ring-4 ring-vice-cyan/30 scale-105'
                        : 'border-white/10 hover:border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={cp.avatar} alt={cp.name} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Presets Selector */}
          <div className="vice-glass p-5 rounded-2xl border border-white/15 space-y-3">
            <h3 className="text-sm font-bold font-orbitron text-white flex items-center justify-between">
              <span>Select Vice Style Filter:</span>
              <span className="text-xs text-vice-cyan font-mono">{currentStylePreset.name}</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STYLE_PRESETS.map((sp) => {
                const isSelected = profile.activeStylePreset === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => handleSelectStylePreset(sp.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-vice-pink/20 border-vice-pink text-white shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{sp.name}</div>
                      <div className="text-[10px] text-slate-400">{sp.subtitle}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-vice-pink" />}
                  </button>
                );
              })}
            </div>
          </div>

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
          <ArrowLeft className="w-4 h-4" /> Back to Intro
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>BUILD YOUR IDENTITY</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Unlayer Editor Modal Component */}
      <UnlayerEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        imageUrl={profile.photoUrl}
        activePresetId={profile.activeStylePreset}
        onSelectPresetId={handleSelectStylePreset}
        onSaveImage={(newUrl) => {
          onUpdateProfile({ editedPhotoUrl: newUrl });
        }}
      />

    </div>
  );
};
