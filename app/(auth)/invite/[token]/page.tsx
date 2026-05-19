"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, XCircle, Clock } from "lucide-react";

type InviteStatus = "loading" | "valid" | "expired" | "accepted" | "not-found" | "error";

interface InviteData {
    id: string;
    email: string;
    role: string;
    company: {
        id: string;
        name: string;
        workModel: string;
    };
}

export default function InvitePage() {
    const params = useParams();
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const [status, setStatus] = useState<InviteStatus>("loading");
    const [invite, setInvite] = useState<InviteData | null>(null);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        if (!params.token) return;

        const fetchInvite = async () => {
            try {
                const response = await fetch(`/api/invites/${params.token}`);
                const data = await response.json();

                if (response.ok) {
                    setInvite(data.invite);
                    setStatus("valid");
                } else if (response.status === 404) {
                    setStatus("not-found");
                } else if (response.status === 410) {
                    setStatus("expired");
                } else if (response.status === 409) {
                    setStatus("accepted");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Error fetching invite:", error);
                setStatus("error");
            }
        };

        fetchInvite();
    }, [params.token]);

    const handleAccept = async () => {
        if (!user || !invite) return;

        setAccepting(true);

        try {
            const response = await fetch(`/api/invites/${params.token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkUserId: user.id,
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.primaryEmailAddress?.emailAddress || invite.email,
                }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                alert("Failed to accept invite. Please try again.");
            }
        } catch (error) {
            console.error("Error accepting invite:", error);
            alert("Failed to accept invite. Please try again.");
        } finally {
            setAccepting(false);
        }
    };

    if (!isLoaded || status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading invitation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b bg-card px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <Image src="/logo.svg" alt="Waayy" width={120} height={40} />
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <Card className="w-full max-w-md p-8">
                    {status === "valid" && invite && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                <Building2 className="w-8 h-8 text-primary" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">You&apos;re invited!</h1>
                                <p className="text-muted-foreground mt-2">
                                    Join {invite.company.name} on Waayy HRMS
                                </p>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-left">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Company:</span>
                                    <span className="font-medium">{invite.company.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Role:</span>
                                    <span className="font-medium capitalize">{invite.role.toLowerCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Work Model:</span>
                                    <span className="font-medium capitalize">
                                        {invite.company.workModel.toLowerCase()}
                                    </span>
                                </div>
                            </div>

                            {user ? (
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Accepting as {user.primaryEmailAddress?.emailAddress}
                                    </p>
                                    <Button
                                        onClick={handleAccept}
                                        disabled={accepting}
                                        className="w-full"
                                    >
                                        {accepting ? "Accepting..." : "Accept Invitation"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Sign in to accept this invitation
                                    </p>
                                    <Button
                                        onClick={() => router.push(`/sign-in?redirect=/invite/${params.token}`)}
                                        className="w-full"
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/sign-up?redirect_url=/invite/${params.token}&invite=true`)}
                                        className="w-full"
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {status === "expired" && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                <Clock className="w-8 h-8 text-destructive" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Invitation Expired</h1>
                                <p className="text-muted-foreground mt-2">
                                    This invitation link has expired. Please contact your administrator for a new invitation.
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "accepted" && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Already Accepted</h1>
                                <p className="text-muted-foreground mt-2">
                                    This invitation has already been accepted.
                                </p>
                            </div>
                            <Button onClick={() => router.push("/dashboard")} className="w-full">
                                Go to Dashboard
                            </Button>
                        </div>
                    )}

                    {status === "not-found" && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                <XCircle className="w-8 h-8 text-destructive" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Invitation Not Found</h1>
                                <p className="text-muted-foreground mt-2">
                                    This invitation link is invalid or has been removed.
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                                <XCircle className="w-8 h-8 text-destructive" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Something Went Wrong</h1>
                                <p className="text-muted-foreground mt-2">
                                    We couldn&apos;t load this invitation. Please try again later.
                                </p>
                            </div>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
}
