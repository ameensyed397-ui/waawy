"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, AlertCircle } from "lucide-react";

interface HMRCStarterFormProps {
    employeeId: string;
    onComplete?: () => void;
}

export default function HMRCStarterForm({ employeeId, onComplete }: HMRCStarterFormProps) {
    const [loading, setLoading] = useState(false);
    const [statementA, setStatementA] = useState(false);
    const [statementB, setStatementB] = useState(false);
    const [statementC, setStatementC] = useState(false);
    const [hasStudentLoan, setHasStudentLoan] = useState(false);
    const [loanPlan, setLoanPlan] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/compliance/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId,
                    type: 'HMRC_STARTER',
                    documentUrl: JSON.stringify({
                        statementA,
                        statementB,
                        statementC,
                        hasStudentLoan,
                        loanPlan,
                    }),
                }),
            });

            if (response.ok) {
                alert('HMRC Starter Checklist submitted successfully!');
                onComplete?.();
            } else {
                throw new Error('Failed to submit checklist');
            }
        } catch (error) {
            console.error('Error submitting HMRC Starter:', error);
            alert('Failed to submit checklist. Please try again.');
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
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">HMRC Starter Checklist</h2>
                        <p className="text-muted-foreground mt-1">
                            Required for new employees to ensure correct tax code
                        </p>
                    </div>
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-medium">What is this?</p>
                        <p className="mt-1">
                            The HMRC Starter Checklist helps your employer work out your tax code and how much tax to deduct from your pay.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1: Employment Status */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Employment Status</h3>
                        <p className="text-sm text-muted-foreground">
                            Select the statement that applies to you (choose ONE only):
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 border rounded-lg">
                                <Checkbox
                                    id="statementA"
                                    checked={statementA}
                                    onCheckedChange={(checked) => {
                                        setStatementA(checked as boolean);
                                        if (checked) {
                                            setStatementB(false);
                                            setStatementC(false);
                                        }
                                    }}
                                />
                                <div className="flex-1">
                                    <label htmlFor="statementA" className="text-sm font-medium">
                                        Statement A
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        This is my first job since last 6 April and I have not been receiving taxable Jobseeker&apos;s Allowance, Employment and Support Allowance, taxable Incapacity Benefit, State or Occupational Pension.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 border rounded-lg">
                                <Checkbox
                                    id="statementB"
                                    checked={statementB}
                                    onCheckedChange={(checked) => {
                                        setStatementB(checked as boolean);
                                        if (checked) {
                                            setStatementA(false);
                                            setStatementC(false);
                                        }
                                    }}
                                />
                                <div className="flex-1">
                                    <label htmlFor="statementB" className="text-sm font-medium">
                                        Statement B
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        This is now my only job but since last 6 April I have had another job, or have received taxable Jobseeker&apos;s Allowance, Employment and Support Allowance or taxable Incapacity Benefit. I do not receive a State or Occupational Pension.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 border rounded-lg">
                                <Checkbox
                                    id="statementC"
                                    checked={statementC}
                                    onCheckedChange={(checked) => {
                                        setStatementC(checked as boolean);
                                        if (checked) {
                                            setStatementA(false);
                                            setStatementB(false);
                                        }
                                    }}
                                />
                                <div className="flex-1">
                                    <label htmlFor="statementC" className="text-sm font-medium">
                                        Statement C
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        I have another job or receive a State or Occupational Pension.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Student Loan */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Student Loan</h3>

                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                            <Checkbox
                                id="hasStudentLoan"
                                checked={hasStudentLoan}
                                onCheckedChange={(checked) => setHasStudentLoan(checked as boolean)}
                            />
                            <div className="flex-1">
                                <label htmlFor="hasStudentLoan" className="text-sm font-medium">
                                    I have a student loan that is not fully repaid
                                </label>
                            </div>
                        </div>

                        {hasStudentLoan && (
                            <div>
                                <Label htmlFor="loanPlan">Student Loan Plan *</Label>
                                <select
                                    id="loanPlan"
                                    value={loanPlan}
                                    onChange={(e) => setLoanPlan(e.target.value)}
                                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    required={hasStudentLoan}
                                >
                                    <option value="">Select plan type</option>
                                    <option value="plan1">Plan 1 (Started before Sept 2012)</option>
                                    <option value="plan2">Plan 2 (Started Sept 2012 or later)</option>
                                    <option value="plan4">Plan 4 (Scottish students)</option>
                                    <option value="postgrad">Postgraduate Loan</option>
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={loading || (!statementA && !statementB && !statementC)}
                            className="flex-1"
                        >
                            {loading ? 'Submitting...' : 'Submit Checklist'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
