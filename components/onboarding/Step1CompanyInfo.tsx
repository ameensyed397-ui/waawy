'use client';

import { useState } from 'react';
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

const companyInfoSchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  country: z.string().min(1, 'Please select a country'),
  industry: z.string().optional(),
  size: z.string().min(1, 'Please select company size'),
  houseNumber: z.string().optional(),
  vatNumber: z.string().optional(),
});

type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

interface OnboardingStep1Props {
  initialData?: Partial<CompanyInfoFormData>;
  onComplete: (data: Record<string, unknown>) => void;
}

const COUNTRIES = [
  { value: 'UK', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'IE', label: 'Ireland' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'ES', label: 'Spain' },
  { value: 'IT', label: 'Italy' },
  { value: 'PT', label: 'Portugal' },
  { value: 'SE', label: 'Sweden' },
];

const SIZE_OPTIONS = [
  { value: 'just-me', label: 'Just me' },
  { value: '1-5', label: '1-5' },
  { value: '5-12', label: '5-12' },
  { value: '12-25', label: '12-25' },
  { value: '25-50', label: '25-50' },
  { value: '50+', label: '50+' },
];

const INDUSTRY_OPTIONS = [
  { value: 'fintech', label: 'Fintech' },
  { value: 'finance', label: 'Finance' },
  { value: 'retail', label: 'Retail' },
  { value: 'it', label: 'IT' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'other', label: 'Other' },
];

export function OnboardingStep1({ initialData, onComplete }: OnboardingStep1Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(initialData?.country || '');
  const [selectedSize, setSelectedSize] = useState(initialData?.size || '');
  const [selectedIndustry, setSelectedIndustry] = useState(initialData?.industry || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: CompanyInfoFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          region: data.country,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create company');
      }

      const result = await response.json();

      onComplete({
        companyId: result.company.id,
        companyName: data.name,
        country: data.country,
        industry: data.industry,
        size: data.size,
        houseNumber: data.houseNumber,
        vatNumber: data.vatNumber,
      });
    } catch (error) {
      console.error('Error creating company:', error);
      alert('Failed to create company. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-zinc-900">
        Tell us about your company
      </h2>

      <StepMascot message="Hello I'm wav 👋" stepLabel="Step 1 of 5" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Company name</label>
          <input
            {...register('name')}
            placeholder="Acme@company private limited"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Country</label>
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
              setValue('country', value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-xs text-red-500">{errors.country.message}</p>
          )}
        </div>

        {/* Size - Pill Selector */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Size</label>
          <PillSelector
            options={SIZE_OPTIONS}
            value={selectedSize}
            onChange={(value) => {
              setSelectedSize(value);
              setValue('size', value);
            }}
            activeColor="blue"
          />
          {errors.size && (
            <p className="text-xs text-red-500">{errors.size.message}</p>
          )}
        </div>

        {/* Industry - Pill Selector */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Industry</label>
          <PillSelector
            options={INDUSTRY_OPTIONS}
            value={selectedIndustry}
            onChange={(value) => {
              setSelectedIndustry(value);
              setValue('industry', value);
            }}
            activeColor="orange"
          />
        </div>

        {/* House Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">House Number</label>
          <input
            {...register('houseNumber')}
            placeholder="2 Plas"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
        </div>

        {/* VAT Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">VAT Number</label>
          <input
            {...register('vatNumber')}
            placeholder="987-4631-654"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-zinc-400"
          />
        </div>

        {/* CTA */}
        <div className="pt-2">
          <OnboardingButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating company...' : "Let's Goo"} <span>›</span>
          </OnboardingButton>
        </div>
      </form>
    </div>
  );
}
