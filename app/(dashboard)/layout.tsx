"use client";

import { TopNav } from "@/components/navigation/top-nav";
import { OnboardingCheck } from "@/components/onboarding/onboarding-check";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OnboardingCheck>
            <div className="min-h-screen bg-zinc-50">
                <TopNav />
                <main className="pt-14">
                    {children}
                </main>
            </div>
        </OnboardingCheck>
    );
}
