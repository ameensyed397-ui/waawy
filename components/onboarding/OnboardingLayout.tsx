'use client';

import React from 'react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}



export function OnboardingLayout({ children }: OnboardingLayoutProps) {

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-[680px]">
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-sky-100/80 to-transparent pointer-events-none" />

          <div className="relative px-8 py-10 sm:px-12 sm:py-12">
            {/* Step content title is rendered by each step component */}
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-400">
            Need help? <a href="mailto:hello@getwaawy.com" className="text-blue-500 hover:underline">hello@getwaawy.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* Reusable mascot component for step headers */
export function StepMascot({ message, stepLabel }: { message: string; stepLabel: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="flex items-stretch gap-0">
        <div className="w-1 bg-blue-400 rounded-full self-stretch" />
        <div className="flex items-center gap-2.5 pl-3 py-1">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
            <span>🤖</span>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-700 leading-tight">{message}</p>
            <p className="text-xs text-blue-400 font-medium">{stepLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable pill selector component */
export function PillSelector({
  options,
  value,
  onChange,
  activeColor = 'blue',
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  activeColor?: 'blue' | 'orange' | 'green';
}) {
  const colorMap = {
    blue: 'bg-blue-500 text-white border-blue-500',
    orange: 'bg-orange-400 text-white border-orange-400',
    green: 'bg-emerald-500 text-white border-emerald-500',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${value === option.value
            ? colorMap[activeColor]
            : 'border-zinc-200 text-zinc-600 bg-white hover:border-zinc-300'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* Black CTA button matching the design */
export function OnboardingButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  if (variant === 'secondary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-lg bg-zinc-100 text-zinc-700 font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-3.5 rounded-lg bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}
