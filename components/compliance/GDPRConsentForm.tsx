"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, AlertCircle } from "lucide-react";

interface GDPRConsentFormProps {
    employeeId: string;
    onComplete?: () => void;
}

export default function GDPRConsentForm({ employeeId, onComplete }: GDPRConsentFormProps) {
    const [loading, setLoading] = useState(false);
    const [dataProcessing, setDataProcessing] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState(false);
    const [photoConsent, setPhotoConsent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/compliance/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId,
                    type: 'GDPR_CONSENT',
                    documentUrl: JSON.stringify({
                        dataProcessing,
                        emergencyContact,
                        photoConsent,
                        consentedAt: new Date().toISOString(),
                    }),
                }),
            });

            if (response.ok) {
                alert('GDPR consent submitted successfully!');
                onComplete?.();
            } else {
                throw new Error('Failed to submit consent');
            }
        } catch (error) {
            console.error('Error submitting GDPR consent:', error);
            alert('Failed to submit consent. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">GDPR Data Consent</h2>
                        <p className="text-muted-foreground mt-1">
                            Your consent for processing personal data
                        </p>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-medium">Your Rights:</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>You can withdraw consent at any time</li>
                            <li>You have the right to access your data</li>
                            <li>You can request data correction or deletion</li>
                            <li>Your data is stored securely and encrypted</li>
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                            <Checkbox
                                id="dataProcessing"
                                checked={dataProcessing}
                                onCheckedChange={(checked) => setDataProcessing(checked as boolean)}
                            />
                            <div className="flex-1">
                                <label htmlFor="dataProcessing" className="text-sm font-medium">
                                    Data Processing Consent *
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    I consent to the company processing my personal data (name, contact details, employment information, bank details) for employment purposes, payroll, and legal compliance.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                            <Checkbox
                                id="emergencyContact"
                                checked={emergencyContact}
                                onCheckedChange={(checked) => setEmergencyContact(checked as boolean)}
                            />
                            <div className="flex-1">
                                <label htmlFor="emergencyContact" className="text-sm font-medium">
                                    Emergency Contact Storage *
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    I consent to the company storing my emergency contact details and using them only in case of emergency.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                            <Checkbox
                                id="photoConsent"
                                checked={photoConsent}
                                onCheckedChange={(checked) => setPhotoConsent(checked as boolean)}
                            />
                            <div className="flex-1">
                                <label htmlFor="photoConsent" className="text-sm font-medium">
                                    Photo and Media Consent (Optional)
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    I consent to the company using my photo/image for internal communications, website, and marketing materials.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Policy Link */}
                    <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm">
                            By submitting this form, you acknowledge that you have read and understood our{' '}
                            <a href="/privacy-policy" className="text-primary hover:underline">
                                Privacy Policy
                            </a>{' '}
                            and{' '}
                            <a href="/data-protection" className="text-primary hover:underline">
                                Data Protection Policy
                            </a>.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={loading || !dataProcessing || !emergencyContact}
                            className="flex-1"
                        >
                            {loading ? 'Submitting...' : 'Submit Consent'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
