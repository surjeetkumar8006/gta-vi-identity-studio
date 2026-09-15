import React from 'react';
import { Check } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
}

const STEP_LABELS = [
  { id: 1, label: 'Landing' },
  { id: 2, label: 'Character & Editor' },
  { id: 3, label: 'Identity' },
  { id: 4, label: 'Reputation' },
  { id: 5, label: 'Empire' },
  { id: 6, label: 'Profile Card' },
  { id: 7, label: 'Download & Share' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  onSelectStep,
}) => {
  if (currentStep === 1) return null; // Hide progress on landing page

  return (
    <div className="w-full bg-[#0a0717] border-b border-vice-pink/20 px-4 py-3">
      <div className="max-w-5xl mx-auto">
        
        {/* Progress Dots / Bar */}
        <div className="flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-vice-pink to-vice-cyan -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (STEP_LABELS.length - 1)) * 100}%`,
            }}
          />

          {STEP_LABELS.map((s) => {
            const isCompleted = s.id < currentStep;
            const isCurrent = s.id === currentStep;

            return (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id <= currentStep) {
                    soundFx.playClick();
                    onSelectStep(s.id);
                  }
                }}
                disabled={s.id > currentStep}
                className={`relative z-10 flex flex-col items-center group ${
                  s.id > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-vice-pink text-white shadow-[0_0_10px_rgba(255,0,127,0.6)]'
                      : isCurrent
                      ? 'bg-vice-cyan text-[#090714] font-black shadow-[0_0_15px_rgba(0,240,255,0.8)] scale-110 ring-4 ring-vice-cyan/30'
                      : 'bg-[#15102a] text-slate-400 border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1.5 hidden md:block transition-all ${
                    isCurrent ? 'text-vice-cyan font-bold scale-105' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
