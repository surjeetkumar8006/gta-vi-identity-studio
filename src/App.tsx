import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProgressBar } from './components/ProgressBar';
import { Step1Landing } from './components/Step1Landing';
import { Step2CharacterCreator } from './components/Step2CharacterCreator';
import { Step3IdentityForm } from './components/Step3IdentityForm';
import { Step4ReputationSystem } from './components/Step4ReputationSystem';
import { Step5EmpireBuilder } from './components/Step5EmpireBuilder';
import { Step6ProfileCards } from './components/Step6ProfileCards';
import { Step7ShareExport } from './components/Step7ShareExport';
import { LeaderboardModal } from './components/LeaderboardModal';
import { PublicProfileView } from './components/PublicProfileView';
import { CharacterProfile } from './types/empire';
import { DEFAULT_PROFILE } from './utils/presets';
import { STEP_TO_PATH, PATH_TO_STEP, navigateTo, getCurrentPath } from './utils/router';

export function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<CharacterProfile>(DEFAULT_PROFILE);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const wantedRef = useRef<HTMLDivElement>(null);

  // Sync state from current window URL path & params
  const syncStateFromURL = () => {
    const path = getCurrentPath();
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('shareId');

    // Check share links (/p/xyz or ?shareId=xyz)
    if (shareId) {
      setActiveShareId(shareId);
      return;
    }
    if (path.startsWith('/p/')) {
      const pId = path.split('/p/')[1];
      if (pId) {
        setActiveShareId(pId);
        return;
      }
    }
    setActiveShareId(null);

    // Check leaderboard path (/leaderboard)
    if (path === '/leaderboard') {
      setIsLeaderboardOpen(true);
      return;
    } else {
      setIsLeaderboardOpen(false);
    }

    // Check step paths (/create, /identity, /reputation, /empire, /profile, /wanted, /export)
    if (PATH_TO_STEP[path]) {
      setCurrentStep(PATH_TO_STEP[path]);
    } else {
      setCurrentStep(1);
    }
  };

  // Initial load and popstate event listener for browser Back/Forward navigation
  useEffect(() => {
    syncStateFromURL();

    const handlePopState = () => {
      syncStateFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleUpdateProfile = (updates: Partial<CharacterProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    const targetPath = STEP_TO_PATH[step] || '/';
    navigateTo(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextStep = Math.min(7, currentStep + 1);
    handleStepChange(nextStep);
  };

  const handleBack = () => {
    const prevStep = Math.max(1, currentStep - 1);
    handleStepChange(prevStep);
  };

  const handleReset = () => {
    setProfile(DEFAULT_PROFILE);
    setCurrentStep(1);
    setActiveShareId(null);
    setIsLeaderboardOpen(false);
    navigateTo('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeaderboard = () => {
    setIsLeaderboardOpen(true);
    navigateTo('/leaderboard');
  };

  const handleCloseLeaderboard = () => {
    setIsLeaderboardOpen(false);
    const currentPath = STEP_TO_PATH[currentStep] || '/';
    navigateTo(currentPath);
  };

  return (
    <div className="min-h-screen bg-[#07050e] text-white flex flex-col font-sans selection:bg-vice-pink selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        totalSteps={7}
        onReset={handleReset}
        onOpenLeaderboard={handleOpenLeaderboard}
      />

      {/* Public Permalink View if URL has ?shareId=... or /p/:id */}
      {activeShareId ? (
        <PublicProfileView
          shareId={activeShareId}
          onClose={() => {
            setActiveShareId(null);
            navigateTo('/');
          }}
        />
      ) : (
        <>
          {/* Step Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={7}
            onSelectStep={handleStepChange}
          />

          {/* Step Components Container */}
          <main className="flex-1">
            {currentStep === 1 && (
              <Step1Landing onStart={handleNext} />
            )}

            {currentStep === 2 && (
              <Step2CharacterCreator
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Step3IdentityForm
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Step4ReputationSystem
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 5 && (
              <Step5EmpireBuilder
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 6 && (
              <Step6ProfileCards
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNext={handleNext}
                onBack={handleBack}
                profileRef={profileRef}
                wantedRef={wantedRef}
              />
            )}

            {currentStep === 7 && (
              <Step7ShareExport
                profile={profile}
                onReset={handleReset}
                profileRef={profileRef}
                wantedRef={wantedRef}
              />
            )}
          </main>
        </>
      )}

      {/* Hidden container for rendering DOM elements during export if step is 7 */}
      {currentStep === 7 && !activeShareId && (
        <div className="fixed -left-[9999px] top-0 pointer-events-none">
          <Step6ProfileCards
            profile={profile}
            onUpdateProfile={() => {}}
            onNext={() => {}}
            onBack={() => {}}
            profileRef={profileRef}
            wantedRef={wantedRef}
          />
        </div>
      )}

      {/* VCPD Most Wanted Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={handleCloseLeaderboard}
        onSelectProfile={(shareId) => {
          setActiveShareId(shareId);
          navigateTo(`/p/${shareId}`);
        }}
      />

      {/* Footer */}
      <footer className="w-full bg-[#05030b] border-t border-white/10 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p>
          VICE CITY: BUILD YOUR CRIMINAL EMPIRE • Powered by Express REST Backend & Dynamic Router
        </p>
        <p className="text-[10px] text-slate-600">
          Powered by <strong className="text-slate-400">@unlayer/react-image-editor</strong> • Community Project
        </p>
      </footer>
    </div>
  );
}

export default App;
