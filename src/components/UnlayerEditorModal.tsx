import React, { useRef, useState } from 'react';
import ImageEditor from '@unlayer/react-image-editor';
import { X, Sparkles, Check, RefreshCw } from 'lucide-react';
import { STYLE_PRESETS } from '../utils/presets';
import { soundFx } from '../utils/soundEffects';

interface UnlayerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSaveImage: (newImageDataUrl: string) => void;
  activePresetId?: string;
  onSelectPresetId?: (presetId: string) => void;
  title?: string;
}

export const UnlayerEditorModal: React.FC<UnlayerEditorModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onSaveImage,
  activePresetId = 'vice_sunset',
  onSelectPresetId,
  title = 'React Image Editor Studio',
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [selectedPreset, setSelectedPreset] = useState(activePresetId);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);

  if (!isOpen) return null;

  const currentPreset = STYLE_PRESETS.find(p => p.id === selectedPreset) || STYLE_PRESETS[0];

  const handleSave = (data: { dataUrl?: string; blob?: Blob }) => {
    soundFx.playSuccess();
    setIsSaving(true);
    if (data.dataUrl) {
      onSaveImage(data.dataUrl);
    }
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 400);
  };

  const handleSelectPreset = (presetId: string) => {
    soundFx.playClick();
    setSelectedPreset(presetId);
    if (onSelectPresetId) {
      onSelectPresetId(presetId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0e0b1c] border-2 border-vice-pink rounded-2xl shadow-[0_0_50px_rgba(255,0,127,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#140f2a] border-b border-vice-pink/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-vice-pink/20 text-vice-pink border border-vice-pink/50">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-orbitron text-white tracking-wide flex items-center gap-2">
                {title}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-vice-cyan/20 text-vice-cyan border border-vice-cyan/40 font-sans">
                  @unlayer/react-image-editor
                </span>
              </h2>
              <p className="text-xs text-slate-400">Crop, resize, filters, stickers, text overlays, frames & draw tools</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Style Presets Selector Ribbon */}
        <div className="px-6 py-3 bg-[#0a0717] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-vice-pink uppercase tracking-widest whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Style Presets:
          </span>
          {STYLE_PRESETS.map((p) => {
            const isSelected = p.id === selectedPreset;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-vice-pink text-white shadow-[0_0_15px_rgba(255,0,127,0.6)] scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/15'
                }`}
              >
                {p.name}
                {isSelected && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Main Editor Body */}
        <div className="relative flex-1 bg-[#06040d] min-h-[500px] flex items-center justify-center p-2 overflow-hidden">
          {loadError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <p className="text-slate-300">Editor initializing...</p>
              <button
                onClick={() => setLoadError(false)}
                className="px-4 py-2 bg-vice-pink text-white text-xs font-bold rounded-lg"
              >
                Retry Editor
              </button>
            </div>
          ) : (
            <div 
              className="w-full h-full min-h-[500px] rounded-lg overflow-hidden transition-all"
              style={{ filter: currentPreset.filterEffect }}
            >
              <ImageEditor
                ref={editorRef}
                image={imageUrl}
                options={{
                  theme: 'dark',
                  locale: 'en',
                  features: {
                    imageEditor: {
                      tools: {
                        crop: true,
                        resize: true,
                        filter: true,
                        draw: true,
                        text: true,
                        shapes: true,
                        stickers: true,
                        frame: true,
                      }
                    }
                  }
                }}
                onSave={handleSave}
                onCancel={onClose}
                minHeight="500px"
              />
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-[#110c24] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs text-slate-300">
              Active Style: <strong style={{ color: currentPreset.accentColor }}>{currentPreset.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                // If user clicks apply directly from modal controls
                if (imageUrl) {
                  handleSave({ dataUrl: imageUrl });
                }
              }}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-vice-pink to-vice-orange hover:from-vice-pinkGlow hover:to-vice-orange text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.5)] transition-all flex items-center gap-2"
            >
              {isSaving ? 'Processing...' : 'Apply Image & Save'}
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
