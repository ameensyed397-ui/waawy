"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export function OnboardingCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { userId, isLoaded } = useAuth();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        async function checkOnboarding() {
            if (!isLoaded || !userId) {
                setChecking(false);
                return;
            }

            try {
                // Set a timeout to prevent infinite loading
                timeoutId = setTimeout(() => {
                    console.warn('Onboarding check timed out');
                    setChecking(false);
                }, 10000); // 10 second timeout

                const response = await fetch('/api/onboarding/status');
                const data = await response.json();

                clearTimeout(timeoutId);

                if (data.needsOnboarding) {
                    // Only redirect if not already on an onboarding page
                    if (!window.location.pathname.startsWith('/onboarding')) {
                        router.push('/onboarding');
                    } else {
                        setChecking(false);
                    }
                } else {
                    setChecking(false);
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
                clearTimeout(timeoutId);
                // Don't block users on API failure - let them through
                setChecking(false);
            }
        }

        checkOnboarding();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [userId, isLoaded, router]);

    if (checking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
