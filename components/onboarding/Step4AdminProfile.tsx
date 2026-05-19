'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { StepMascot, OnboardingButton } from './OnboardingLayout';

const adminProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  department: z.string().optional(),
});

type AdminProfileFormData = z.infer<typeof adminProfileSchema>;

interface OnboardingStep4Props {
  initialData?: Record<string, unknown>;
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

export function OnboardingStep4({ initialData, onComplete, onBack }: OnboardingStep4Props) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePictureUrl] = useState(user?.imageUrl || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      jobTitle: 'Founder',
    },
  });

  const onSubmit = async (data: AdminProfileFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/employees/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          profilePicture: profilePictureUrl,
          companyId: initialData?.companyId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      onComplete({
        adminProfileComplete: true,
        ...data,
      });
    } catch (error) {
      console.error('Error updating admin profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-zinc-900">
        Your profile
      </h2>

      <StepMascot message="Let's get to know you ✌️" stepLabel="Step 4 of 5" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Profile Picture */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border-2 border-zinc-200">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt="Profile"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl">👤</span>
            )}
          </div>
        </div>

        {/* First Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">First name</label>
          <input
            {...register('firstName')}
            placeholder="Sarah"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Last name</label>
          <input
            {...register('lastName')}
            placeholder="Johnson"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Job title</label>
          <input
            {...register('jobTitle')}
            placeholder="Founder, CEO, Head of HR"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500">{errors.jobTitle.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Department (optional)</label>
          <input
            {...register('department')}
            placeholder="Leadership, Operations"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
        </div>

        {/* Email (read-only) */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Email</label>
          <input
            value={user?.primaryEmailAddress?.emailAddress || ''}
            disabled
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-zinc-500"
          />
          <p className="text-xs text-zinc-400">Email is managed through your account settings</p>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex gap-3">
          <OnboardingButton variant="secondary" onClick={onBack} className="flex-shrink-0">
            ← Back
          </OnboardingButton>
          <OnboardingButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Continue'} <span>›</span>
          </OnboardingButton>
        </div>
      </form>
    </div>
  );
}
