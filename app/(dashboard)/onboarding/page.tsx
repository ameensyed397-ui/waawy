'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingStep1 } from '@/components/onboarding/Step1CompanyInfo';
import { OnboardingStep2 } from '@/components/onboarding/Step2WorkspacePreferences';
import { OnboardingStep3 } from '@/components/onboarding/Step3LeavePolicy';
import { OnboardingStep4 } from '@/components/onboarding/Step4AdminProfile';
import { OnboardingStep5 } from '@/components/onboarding/Step5TeamInvite';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/onboarding/status');
      const data: { setupComplete: boolean; lastSavedStep?: number; companyData?: Record<string, unknown> } = await response.json();

      if (data.setupComplete) {
        // Already completed onboarding
        router.push('/dashboard');
        return;
      }

      // Resume from last saved step
      if (data.lastSavedStep) {
        setCurrentStep(data.lastSavedStep);
      }

      if (data.companyData) {
        setOnboardingData(data.companyData);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  const handleStepComplete = async (stepNumber: number, stepData: Record<string, unknown>) => {
    // Merge step data
    const updatedData = {
      ...onboardingData,
      ...stepData,
    };
    setOnboardingData(updatedData);

    // Save progress
    await fetch('/api/onboarding/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: stepNumber,
        data: updatedData,
      }),
    });

    // Move to next step or complete
    if (stepNumber < 5) {
      setCurrentStep(stepNumber + 1);
    } else {
      // Mark onboarding as complete
      await fetch('/api/onboarding/complete', {
        method: 'POST',
      });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={5}>
      {currentStep === 1 && (
        <OnboardingStep1
          initialData={onboardingData}
          onComplete={(data) => handleStepComplete(1, data)}
        />
      )}

      {currentStep === 2 && (
        <OnboardingStep2
          initialData={onboardingData}
          onComplete={(data) => handleStepComplete(2, data)}
          onBack={handleBack}
        />
      )}

      {currentStep === 3 && (
        <OnboardingStep3
          initialData={onboardingData}
          onComplete={(data) => handleStepComplete(3, data)}
          onBack={handleBack}
        />
      )}

      {currentStep === 4 && (
        <OnboardingStep4
          initialData={onboardingData}
          onComplete={(data) => handleStepComplete(4, data)}
          onBack={handleBack}
        />
      )}

      {currentStep === 5 && (
        <OnboardingStep5
          companyId={onboardingData.companyId as string}
          onComplete={(data) => handleStepComplete(5, data)}
          onBack={handleBack}
          onSkip={() => handleStepComplete(5, { invitesSent: 0 })}
        />
      )}
    </OnboardingLayout>
  );
}
