'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StepMascot, PillSelector, OnboardingButton } from './OnboardingLayout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const workspacePreferencesSchema = z.object({
  timezone: z.string().min(1, 'Please select a timezone'),
  currency: z.string().min(1, 'Please select a currency'),
  fiscalYearStart: z.number().min(1).max(12),
  workWeekStart: z.string().min(1, 'Please select work week start day'),
});

type WorkspacePreferencesFormData = z.infer<typeof workspacePreferencesSchema>;

interface OnboardingStep2Props {
  initialData?: Record<string, unknown>;
  onComplete: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const TIMEZONES = [
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Dublin', label: 'Dublin (GMT)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam (CET)' },
  { value: 'Europe/Madrid', label: 'Madrid (CET)' },
  { value: 'Europe/Rome', label: 'Rome (CET)' },
  { value: 'Europe/Lisbon', label: 'Lisbon (WET)' },
  { value: 'Europe/Stockholm', label: 'Stockholm (CET)' },
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'America/Chicago', label: 'Chicago (CST)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
];

const CURRENCY_OPTIONS = [
  { value: 'GBP', label: '£ GBP' },
  { value: 'EUR', label: '€ EUR' },
  { value: 'USD', label: '$ USD' },
];

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const WEEK_START_OPTIONS = [
  { value: 'MONDAY', label: 'Monday' },
  { value: 'SUNDAY', label: 'Sunday' },
  { value: 'SATURDAY', label: 'Saturday' },
];

const COUNTRY_DEFAULTS: Record<string, Partial<WorkspacePreferencesFormData>> = {
  UK: { timezone: 'Europe/London', currency: 'GBP', fiscalYearStart: 4, workWeekStart: 'MONDAY' },
  IE: { timezone: 'Europe/Dublin', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  DE: { timezone: 'Europe/Berlin', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  FR: { timezone: 'Europe/Paris', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  NL: { timezone: 'Europe/Amsterdam', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  ES: { timezone: 'Europe/Madrid', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  IT: { timezone: 'Europe/Rome', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  PT: { timezone: 'Europe/Lisbon', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  SE: { timezone: 'Europe/Stockholm', currency: 'EUR', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
  US: { timezone: 'America/New_York', currency: 'USD', fiscalYearStart: 1, workWeekStart: 'MONDAY' },
};

export function OnboardingStep2({ initialData, onComplete, onBack }: OnboardingStep2Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const country = initialData?.country || 'UK';
  const defaults = COUNTRY_DEFAULTS[country as string] || COUNTRY_DEFAULTS['UK'];

  const [selectedTimezone, setSelectedTimezone] = useState(defaults.timezone!);
  const [selectedCurrency, setSelectedCurrency] = useState(defaults.currency!);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(defaults.fiscalYearStart!);
  const [selectedWeekStart, setSelectedWeekStart] = useState(defaults.workWeekStart!);

  const {
    handleSubmit,
    setValue,
  } = useForm<WorkspacePreferencesFormData>({
    resolver: zodResolver(workspacePreferencesSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    setValue('timezone', defaults.timezone!);
    setValue('currency', defaults.currency!);
    setValue('fiscalYearStart', defaults.fiscalYearStart!);
    setValue('workWeekStart', defaults.workWeekStart!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: WorkspacePreferencesFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/companies/${initialData?.companyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update workspace preferences');
      }

      onComplete(data);
    } catch (error) {
      console.error('Error updating workspace preferences:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-zinc-900">
        Let&apos;s create your workspace!
      </h2>

      <StepMascot message="Setup your mini world 👋" stepLabel="Step 2 of 5" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Timezone */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Primary Timezone</label>
          <Select
            value={selectedTimezone}
            onValueChange={(value) => {
              setSelectedTimezone(value);
              setValue('timezone', value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fiscal Year Start */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Fiscal Year Start Date</label>
          <Select
            value={selectedFiscalYear.toString()}
            onValueChange={(value) => {
              const monthNum = parseInt(value);
              setSelectedFiscalYear(monthNum);
              setValue('fiscalYearStart', monthNum);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Work Week - Pill Selector */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Work Week Starts On</label>
          <PillSelector
            options={WEEK_START_OPTIONS}
            value={selectedWeekStart}
            onChange={(value) => {
              setSelectedWeekStart(value);
              setValue('workWeekStart', value);
            }}
            activeColor="blue"
          />
        </div>

        {/* Currency - Pill Selector */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Currency</label>
          <PillSelector
            options={CURRENCY_OPTIONS}
            value={selectedCurrency}
            onChange={(value) => {
              setSelectedCurrency(value);
              setValue('currency', value);
            }}
            activeColor="blue"
          />
        </div>

        {/* Buttons */}
        <div className="pt-2 flex gap-3">
          <OnboardingButton variant="secondary" onClick={onBack} className="flex-shrink-0">
            ← Back
          </OnboardingButton>
          <OnboardingButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : "Awesome, Let's setup leave's"} <span>›</span>
          </OnboardingButton>
        </div>
      </form>
    </div>
  );
}
