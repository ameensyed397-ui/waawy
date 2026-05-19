'use client';

import { useState } from 'react';
import { StepMascot, OnboardingButton } from './OnboardingLayout';

interface LeavePolicy {
  name: string;
  emoji: string;
  allowanceDays: number;
  paidLeave: boolean;
  requiresApproval: boolean;
  isStatutory: boolean;
}

interface OnboardingStep3Props {
  initialData?: Record<string, unknown>;
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const COUNTRY_LEAVE_DEFAULTS: Record<string, LeavePolicy[]> = {
  UK: [
    { name: 'Annual Leave', emoji: '🏖️', allowanceDays: 28, paidLeave: true, requiresApproval: true, isStatutory: true },
    { name: 'Sick Leave', emoji: '🤒', allowanceDays: 365, paidLeave: true, requiresApproval: false, isStatutory: true },
    { name: 'Parental Leave', emoji: '👶', allowanceDays: 365, paidLeave: true, requiresApproval: true, isStatutory: true },
  ],
  US: [
    { name: 'Vacation', emoji: '🏖️', allowanceDays: 15, paidLeave: true, requiresApproval: true, isStatutory: false },
    { name: 'Sick Leave', emoji: '🤒', allowanceDays: 10, paidLeave: true, requiresApproval: false, isStatutory: false },
    { name: 'Personal Days', emoji: '🏡', allowanceDays: 5, paidLeave: true, requiresApproval: true, isStatutory: false },
  ],
  DE: [
    { name: 'Annual Leave', emoji: '🏖️', allowanceDays: 25, paidLeave: true, requiresApproval: true, isStatutory: true },
    { name: 'Sick Leave', emoji: '🤒', allowanceDays: 365, paidLeave: true, requiresApproval: false, isStatutory: true },
    { name: 'Parental Leave', emoji: '👶', allowanceDays: 365, paidLeave: true, requiresApproval: true, isStatutory: true },
  ],
  FR: [
    { name: 'Congés Payés', emoji: '🏖️', allowanceDays: 25, paidLeave: true, requiresApproval: true, isStatutory: true },
    { name: 'Sick Leave', emoji: '🤒', allowanceDays: 365, paidLeave: true, requiresApproval: false, isStatutory: true },
    { name: 'Parental Leave', emoji: '👶', allowanceDays: 365, paidLeave: true, requiresApproval: true, isStatutory: true },
  ],
  DEFAULT: [
    { name: 'Annual Leave', emoji: '🏖️', allowanceDays: 20, paidLeave: true, requiresApproval: true, isStatutory: false },
    { name: 'Sick Leave', emoji: '🤒', allowanceDays: 10, paidLeave: true, requiresApproval: false, isStatutory: false },
  ],
};

export function OnboardingStep3({ initialData, onComplete, onBack }: OnboardingStep3Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const country = (initialData?.country as string) || 'UK';
  const defaultPolicies = COUNTRY_LEAVE_DEFAULTS[country] || COUNTRY_LEAVE_DEFAULTS.DEFAULT;

  const [leavePolicies, setLeavePolicies] = useState<LeavePolicy[]>(defaultPolicies);

  const handlePolicyUpdate = (index: number, field: keyof LeavePolicy, value: string | number | boolean) => {
    const updated = [...leavePolicies];
    updated[index] = { ...updated[index], [field]: value };
    setLeavePolicies(updated);
  };

  const handleAddCustomPolicy = () => {
    setLeavePolicies([
      ...leavePolicies,
      {
        name: '',
        emoji: '📅',
        allowanceDays: 5,
        paidLeave: true,
        requiresApproval: true,
        isStatutory: false,
      },
    ]);
    setIsEditing(true);
  };

  const handleRemovePolicy = (index: number) => {
    const updated = leavePolicies.filter((_, i) => i !== index);
    setLeavePolicies(updated);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leave-policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: initialData?.companyId,
          policies: leavePolicies,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create leave policies');
      }

      onComplete({ leavePoliciesCreated: leavePolicies.length });
    } catch (error) {
      console.error('Error creating leave policies:', error);
      alert('Failed to save leave policies. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCountryLabel = (code: string) => {
    const labels: Record<string, string> = { UK: 'UK', US: 'US', DE: 'Germany', FR: 'France', IE: 'Ireland', NL: 'Netherlands', ES: 'Spain', IT: 'Italy', PT: 'Portugal', SE: 'Sweden' };
    return labels[code] || code;
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-zinc-900">
        Set up leave policies
      </h2>

      <StepMascot message="Setup your holiday time🤙" stepLabel="Step 3 of 5" />

      {/* Statutory leave summary card */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-amber-800">
            For {getCountryLabel(country)}, statutory provision is:
          </h3>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-medium text-amber-600 hover:text-amber-700 px-3 py-1 rounded-md bg-amber-100 hover:bg-amber-200 transition-colors"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>

        <div className="space-y-3">
          {leavePolicies.map((policy, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{policy.emoji}</span>
                {isEditing ? (
                  <input
                    value={policy.name}
                    onChange={(e) => handlePolicyUpdate(index, 'name', e.target.value)}
                    className="text-sm font-medium bg-white border border-amber-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  />
                ) : (
                  <span className="text-sm font-medium text-zinc-700">{policy.name}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      value={policy.allowanceDays}
                      onChange={(e) => handlePolicyUpdate(index, 'allowanceDays', parseInt(e.target.value))}
                      className="w-16 text-sm bg-white border border-amber-200 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-amber-300"
                      min={0}
                      max={365}
                    />
                    <span className="text-xs text-zinc-500">days</span>
                    {!policy.isStatutory && (
                      <button
                        type="button"
                        onClick={() => handleRemovePolicy(index)}
                        className="text-red-400 hover:text-red-600 text-xs ml-1"
                      >
                        ✕
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-zinc-500">
                    {policy.allowanceDays === 365 ? 'Unlimited (SSP rules)' : `${policy.allowanceDays} days`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={handleAddCustomPolicy}
            className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Add custom leave type
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="pt-2 flex gap-3">
        <OnboardingButton variant="secondary" onClick={onBack} className="flex-shrink-0">
          ← Back
        </OnboardingButton>
        <OnboardingButton onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Awesome, Next'} <span>›</span>
        </OnboardingButton>
      </div>
    </div>
  );
}
