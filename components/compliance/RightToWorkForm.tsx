"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, AlertCircle } from "lucide-react";

interface RightToWorkFormProps {
    employeeId: string;
    onComplete?: () => void;
}

export default function RightToWorkForm({ employeeId, onComplete }: RightToWorkFormProps) {
    const [loading, setLoading] = useState(false);
    const [documentType, setDocumentType] = useState<string>("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [hasRightToWork, setHasRightToWork] = useState(false);
    const [documentFile, setDocumentFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // TODO: Upload document file to storage (Uploadthing/S3)
            const documentUrl = documentFile ? "placeholder-url" : undefined;

            const response = await fetch('/api/compliance/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId,
                    type: 'RIGHT_TO_WORK',
                    documentUrl,
                    expiryDate: expiryDate || undefined,
                }),
            });

            if (response.ok) {
                alert('Right to Work document submitted successfully!');
                onComplete?.();
            } else {
                throw new Error('Failed to submit document');
            }
        } catch (error) {
            console.error('Error submitting Right to Work:', error);
            alert('Failed to submit document. Please try again.');
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
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">Right to Work Verification</h2>
                        <p className="text-muted-foreground mt-1">
                            UK employers must verify that employees have the right to work in the UK
                        </p>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-medium">Acceptable Documents (List A or B):</p>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li>UK/Irish passport</li>
                            <li>Biometric Residence Permit (BRP)</li>
                            <li>Share code from UK Government online service</li>
                            <li>Birth certificate + National Insurance number (UK nationals)</li>
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="documentType">Document Type *</Label>
                        <select
                            id="documentType"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            required
                        >
                            <option value="">Select document type</option>
                            <option value="passport">UK/Irish Passport</option>
                            <option value="brp">Biometric Residence Permit</option>
                            <option value="share_code">Share Code</option>
                            <option value="birth_cert">Birth Certificate + NI Number</option>
                            <option value="other">Other (List B)</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="documentNumber">Document Number *</Label>
                        <Input
                            id="documentNumber"
                            placeholder="e.g., Passport number"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            required
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                        <Input
                            id="expiryDate"
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="documentFile">Upload Document Copy *</Label>
                        <Input
                            id="documentFile"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                            required
                            className="mt-1.5"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Upload a clear copy of the document (PDF or image)
                        </p>
                    </div>

                    {/* Confirmation */}
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Checkbox
                            id="confirm"
                            checked={hasRightToWork}
                            onCheckedChange={(checked) => setHasRightToWork(checked as boolean)}
                        />
                        <div className="flex-1">
                            <label
                                htmlFor="confirm"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I confirm that I have the right to work in the UK
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                                Providing false information is a criminal offence
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={loading || !hasRightToWork || !documentFile}
                            className="flex-1"
                        >
                            {loading ? 'Submitting...' : 'Submit for Verification'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
