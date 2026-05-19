"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const isInvite = searchParams.get('invite') || (searchParams.get('redirect_url') || "").includes('/invite/');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerifying(true);
        } catch (err: unknown) {
            const error = err as { errors?: Array<{ message: string }> };
            setError(error.errors?.[0]?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/onboarding");
            }
        } catch (err: unknown) {
            const error = err as { errors?: Array<{ message: string }> };
            setError(error.errors?.[0]?.message || "Invalid verification code");
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
                        Start your HR journey with Waayy
                    </h1>
                    <p className="text-lg text-primary-foreground/90">
                        Join hundreds of founders who trust Waayy for their HR needs.
                    </p>
                    <div className="space-y-4 pt-8">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">Free to Start</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    No credit card required
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">Setup in Minutes</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    Get started with your first employee today
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-semibold">Expert Support</h3>
                                <p className="text-sm text-primary-foreground/80">
                                    We&apos;re here to help every step of the way
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
                {isInvite ? (
                    <Card className="w-full max-w-md p-6 sm:p-8 space-y-6">
                        {!verifying ? (
                            <>
                                <div className="space-y-2 text-center">
                                    <h2 className="text-3xl font-bold">Create an account</h2>
                                    <p className="text-muted-foreground">
                                        Get started with Waayy HRMS today
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

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
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Must be at least 8 characters
                                        </p>
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
                                        {loading ? "Creating account..." : "Create account"}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2 text-center">
                                    <h2 className="text-3xl font-bold">Verify your email</h2>
                                    <p className="text-muted-foreground">
                                        We sent a verification code to {email}
                                    </p>
                                </div>

                                <form onSubmit={handleVerify} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Verification code</Label>
                                        <Input
                                            id="code"
                                            placeholder="000000"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
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
                                        {loading ? "Verifying..." : "Verify email"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => setVerifying(false)}
                                    >
                                        Back to signup
                                    </Button>
                                </form>
                            </>
                        )}

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link href="/sign-in" className="text-primary font-medium hover:underline">
                                Sign in
                            </Link>
                        </div>

                    </Card>
                ) : (
                    <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold">Early Access Only</h2>
                            <p className="text-muted-foreground">
                                Waawy is currently in private beta. You need an invite to create an account.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Button className="w-full" asChild>
                                <Link href="/">Join the Waitlist</Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
