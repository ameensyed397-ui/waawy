"use client";

import { useState, useEffect } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { userId } = useAuth(); // Add useAuth hook
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Redirect if already signed in
    useEffect(() => {
        if (isLoaded && userId) {
            // Check onboarding status before redirecting
            fetch('/api/onboarding/status')
                .then(res => res.json())
                .then(data => {
                    if (data.needsOnboarding) {
                        router.push('/onboarding');
                    } else {
                        router.push('/dashboard');
                    }
                })
                .catch(() => router.push('/dashboard'));
        }
    }, [isLoaded, userId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });

                // Check onboarding status before redirecting
                try {
                    const onboardingResponse = await fetch('/api/onboarding/status');
                    const onboardingData = await onboardingResponse.json();

                    if (onboardingData.needsOnboarding) {
                        router.push('/onboarding');
                    } else {
                        router.push("/dashboard");
                    }
                } catch (onboardingError) {
                    console.error('Error checking onboarding status:', onboardingError);
                    router.push("/dashboard");
                }
            }
        } catch (err: unknown) {
            // Handle specific error for existing session
            const error = err as { errors?: Array<{ code: string; message: string }> };
            if (error.errors?.[0]?.code === "session_exists") {
                // Check onboarding status for existing session
                try {
                    const onboardingResponse = await fetch('/api/onboarding/status');
                    const onboardingData = await onboardingResponse.json();

                    if (onboardingData.needsOnboarding) {
                        router.push('/onboarding');
                    } else {
                        router.push("/dashboard");
                    }
                } catch {
                    router.push("/dashboard");
                }
                return;
            }
            setError(error.errors?.[0]?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center items-center p-8 lg:p-12 text-white">
                <div className="max-w-md space-y-6">
                    <Image
                        src="/logo.svg"
                        alt="Waayy Logo"
                        width={200}
                        height={80}
                        className="mb-8"
                    />
                    <h1 className="text-4xl font-bold">
                        Welcome back to Waayy HRMS
                    </h1>
                    <p className="text-lg text-primary-foreground/90">
                        Help founders onboard people with clarity, care, and confidence.
                    </p>
                    <div className="space-y-4 pt-8">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">Quick Setup</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    Company onboarding in under 15 minutes
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">UK Compliance Built-in</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    Right to Work, HMRC, and GDPR automated
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">Remote-First</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    Perfect for distributed teams
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
                <Card className="w-full max-w-md p-6 sm:p-8 space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold">Sign in</h2>
                        <p className="text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don&apos;t have an account? </span>
                        <Link href="/" className="text-primary font-medium hover:underline">
                            Join the waitlist
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
