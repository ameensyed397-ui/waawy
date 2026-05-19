'use client';

import { useState } from 'react';
import { StepMascot, OnboardingButton } from './OnboardingLayout';

interface TeamMember {
  email: string;
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
}

interface InviteLink {
  email: string;
  link: string;
  emailSent: boolean;
}

interface OnboardingStep5Props {
  companyId: string;
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
  onSkip: () => void;
}

export function OnboardingStep5({ companyId, onComplete, onSkip }: OnboardingStep5Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { email: '', role: 'EMPLOYEE' },
    { email: '', role: 'EMPLOYEE' },
  ]);
  const [emailsSent, setEmailsSent] = useState<string[]>([]);

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { email: '', role: 'EMPLOYEE' }]);
  };

  const handleRemoveMember = (index: number) => {
    if (teamMembers.length > 1) {
      const updated = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updated);
    }
  };

  const handleUpdateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    // We can safely cast here as the select options match the type
    updated[index] = { ...updated[index], [field]: value as TeamMember[keyof TeamMember] };
    setTeamMembers(updated);
  };

  const handleSendInvites = async () => {
    const validMembers = teamMembers.filter((m) => m.email.trim() !== '');

    if (validMembers.length === 0) {
      alert('Please enter at least one email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId,
          invites: validMembers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invites');
      }

      const result = await response.json();
      const sentEmails = (result.inviteLinks as InviteLink[])
        .filter((link) => link.emailSent)
        .map((link) => link.email);

      setEmailsSent(sentEmails);

      setTimeout(() => {
        onComplete({ invitesSent: validMembers.length });
      }, 2000);
    } catch (error) {
      console.error('Error sending invites:', error);
      alert('Failed to send invites. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-zinc-900">
        Invite your teams!
      </h2>

      <StepMascot
        message="Wavy is better with your team. Invite them now, or skip and do it from the dashboard"
        stepLabel="Step 5 of 5"
      />

      {emailsSent.length > 0 ? (
        <div className="text-center py-8">
          <div className="mb-4 text-5xl">✉️</div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Invites sent!</h3>
          <p className="text-sm text-zinc-500 mb-4">
            We&apos;ve sent invitations to {emailsSent.length} team member{emailsSent.length > 1 ? 's' : ''}:
          </p>
          <div className="space-y-1 mb-6">
            {emailsSent.map((email) => (
              <p key={email} className="text-sm text-zinc-700">✓ {email}</p>
            ))}
          </div>
          <OnboardingButton onClick={() => onComplete({ invitesSent: emailsSent.length })}>
            Go to dashboard <span>›</span>
          </OnboardingButton>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-sm font-medium text-zinc-700">
                    Mail id {index + 1}
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) => handleUpdateMember(index, 'email', e.target.value)}
                    placeholder="team.member@company.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
                  />
                </div>
                {teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="mt-6 text-zinc-400 hover:text-red-500 transition-colors text-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="w-full py-2.5 rounded-lg bg-zinc-100 text-zinc-600 text-sm font-medium hover:bg-zinc-200 transition-colors mb-5"
          >
            + Add
          </button>

          {/* Buttons */}
          <div className="flex gap-3">
            <OnboardingButton variant="secondary" onClick={onSkip} className="flex-shrink-0">
              Skip Now <span>›</span>
            </OnboardingButton>
            <OnboardingButton onClick={handleSendInvites} disabled={isSubmitting}>
              {isSubmitting ? 'Sending invites...' : 'Send Invite'} <span>›</span>
            </OnboardingButton>
          </div>
        </>
      )}
    </div>
  );
}
