import React from 'react';
import { Award, DollarSign, TrendingUp, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { CharacterProfile, ReputationStats } from '../types/empire';
import { soundFx } from '../utils/soundEffects';

interface Step4ReputationSystemProps {
  profile: CharacterProfile;
  onUpdateProfile: (updates: Partial<CharacterProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SCENARIOS = [
  {
    id: 'bank_heist',
    title: 'High-Stakes Bank Heist',
    desc: 'Plan a precision vault breach at Vice City National Bank.',
    effectText: '+30 Money, +20 Risk, +15 Reputation',
    impact: { money: 30, risk: 20, streetRep: 15, influence: 5 },
  },
  {
    id: 'midnight_race',
    title: 'Midnight Drag Circuit',
    desc: 'Risk your exotic GT car in an illegal freeway race.',
    effectText: '+25 Street Rep, +15 Risk, +10 Money',
    impact: { streetRep: 25, risk: 15, money: 10, influence: 5 },
  },
  {
    id: 'nightclub_buyout',
    title: 'Nightclub & Lounge Buyout',
    desc: 'Acquire Malibu Lounge to launder cash and host VIP syndicate events.',
    effectText: '+35 Influence, +25 Money, -10 Risk',
    impact: { influence: 35, money: 25, risk: -10, streetRep: 10 },
  },
];

export const Step4ReputationSystem: React.FC<Step4ReputationSystemProps> = ({
  profile,
  onUpdateProfile,
  onNext,
  onBack,
}) => {

  const toggleScenario = (scenarioId: string) => {
    soundFx.playStarGain();
    const current = profile.selectedScenarios || [];
    let updated: string[];
    if (current.includes(scenarioId)) {
      updated = current.filter(id => id !== scenarioId);
    } else {
      updated = [...current, scenarioId];
    }

    // Re-calculate stats from base (50, 50, 50, 50)
    const baseStats: ReputationStats = { streetRep: 50, money: 50, influence: 50, risk: 40 };
    updated.forEach(sId => {
      const scenario = SCENARIOS.find(s => s.id === sId);
      if (scenario) {
        baseStats.streetRep = Math.min(100, Math.max(10, baseStats.streetRep + scenario.impact.streetRep));
        baseStats.money = Math.min(100, Math.max(10, baseStats.money + scenario.impact.money));
        baseStats.influence = Math.min(100, Math.max(10, baseStats.influence + scenario.impact.influence));
        baseStats.risk = Math.min(100, Math.max(10, baseStats.risk + scenario.impact.risk));
      }
    });

    onUpdateProfile({ selectedScenarios: updated, stats: baseStats });
  };

  const resetStats = () => {
    soundFx.playClick();
    onUpdateProfile({
      selectedScenarios: [],
      stats: { streetRep: 60, money: 50, influence: 65, risk: 50 },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vice-pink/10 border border-vice-pink/30 text-vice-pink text-xs font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5" /> Step 4: Reputation & Dynamic Stats
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-orbitron text-white">
          YOUR <span className="text-neon-pink">CRIMINAL REPUTATION</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Every decision shapes your empire. Select operations to boost your stats and dynamic profile card.
        </p>
      </div>

      {/* Main Stats Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Live Stat Meters */}
        <div className="vice-glass p-6 rounded-3xl border border-vice-pink/30 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-orbitron text-white">Empire Dynamic Stats</h3>
            <button
              onClick={resetStats}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Street Rep */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-vice-pink flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Street Reputation
              </span>
              <span className="text-white font-mono">{profile.stats.streetRep} / 100</span>
            </div>
            <div className="h-3 w-full bg-[#090714] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-vice-pink to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,0,127,0.7)]"
                style={{ width: `${profile.stats.streetRep}%` }}
              />
            </div>
          </div>

          {/* Money */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> Money & Cash Flow
              </span>
              <span className="text-white font-mono">{profile.stats.money} / 100</span>
            </div>
            <div className="h-3 w-full bg-[#090714] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                style={{ width: `${profile.stats.money}%` }}
              />
            </div>
          </div>

          {/* Influence */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-vice-cyan flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Syndicate Influence
              </span>
              <span className="text-white font-mono">{profile.stats.influence} / 100</span>
            </div>
            <div className="h-3 w-full bg-[#090714] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-vice-cyan to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.7)]"
                style={{ width: `${profile.stats.influence}%` }}
              />
            </div>
          </div>

          {/* Risk */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-vice-orange flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> VCPD Risk Level
              </span>
              <span className="text-white font-mono">{profile.stats.risk} / 100</span>
            </div>
            <div className="h-3 w-full bg-[#090714] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-vice-orange to-red-600 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,138,0,0.7)]"
                style={{ width: `${profile.stats.risk}%` }}
              />
            </div>
          </div>

        </div>

        {/* Dynamic Scenario Operations */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold font-orbitron text-white uppercase tracking-wider">
            Choose Your Syndicate Operations:
          </h3>

          {SCENARIOS.map((sc) => {
            const isSelected = profile.selectedScenarios?.includes(sc.id);
            return (
              <button
                key={sc.id}
                onClick={() => toggleScenario(sc.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-vice-pink/20 border-vice-pink text-white shadow-[0_0_15px_rgba(255,0,127,0.4)] scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{sc.title}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isSelected ? 'bg-vice-pink text-white' : 'bg-white/10 text-slate-400'}`}>
                    {isSelected ? 'ACTIVE' : '+ SELECT'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{sc.desc}</p>
                <div className="text-[10px] font-mono text-vice-cyan mt-2">{sc.effectText}</div>
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
          <ArrowLeft className="w-4 h-4" /> Back to Identity
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onNext();
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-vice-pink to-vice-cyan text-white font-black font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>BUILD YOUR EMPIRE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
