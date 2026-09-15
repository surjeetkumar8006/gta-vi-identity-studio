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
  { id: 2, label: 'Character' },
  { id: 3, label: 'Identity' },
  { id: 4, label: 'Reputation' },
  { id: 5, label: 'Empire' },
  { id: 6, label: 'Profile' },
  { id: 7, label: 'Export' },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  onSelectStep,
}) => {
  if (currentStep === 1) return null; // Hide progress on landing page

  return (
    <div className="w-full bg-[#0a0717] border-b border-vice-pink/20 px-2 sm:px-4 py-2.5 overflow-x-auto">
      <div className="max-w-4xl mx-auto min-w-[320px]">
        
        {/* Progress Dots / Bar */}
        <div className="flex items-center justify-between relative px-2">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
          <div
            className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-vice-pink to-vice-cyan -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (STEP_LABELS.length - 1)) * 92}%`,
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
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs transition-all ${
                    isCompleted
                      ? 'bg-vice-pink text-white shadow-sm'
                      : isCurrent
                      ? 'bg-vice-cyan text-[#090714] font-black scale-110 ring-2 sm:ring-4 ring-vice-cyan/30'
                      : 'bg-[#15102a] text-slate-400 border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-semibold mt-1 transition-all ${
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
