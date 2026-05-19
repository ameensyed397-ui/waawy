"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileCheck, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

interface ComplianceDocument {
    id: string;
    type: string;
    status: string;
    createdAt: string;
    verifiedAt: string | null;
    employee: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export default function CompliancePage() {
    const [documents, setDocuments] = useState<ComplianceDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/compliance/documents');
            const data = await response.json();

            if (data.success) {
                setDocuments(data.documents);
            }
        } catch (error) {
            console.error('Error fetching compliance documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; icon: React.ComponentType<{ className?: string }> }> = {
            PENDING: { variant: "outline", icon: Clock },
            SUBMITTED: { variant: "secondary", icon: FileCheck },
            VERIFIED: { variant: "default", icon: CheckCircle2 },
            REJECTED: { variant: "destructive", icon: AlertTriangle },
        };

        const { variant, icon: Icon } = config[status] || config.PENDING;

        return (
            <Badge variant={variant} className="flex items-center gap-1">
                <Icon className="w-3 h-3" />
                {status}
            </Badge>
        );
    };

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            RIGHT_TO_WORK: 'Right to Work',
            HMRC_STARTER: 'HMRC Starter',
            GDPR_CONSENT: 'GDPR Consent',
        };
        return labels[type] || type;
    };

    const stats = {
        total: documents.length,
        pending: documents.filter(d => d.status === 'PENDING').length,
        submitted: documents.filter(d => d.status === 'SUBMITTED').length,
        verified: documents.filter(d => d.status === 'VERIFIED').length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Compliance</h1>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                        Manage employee compliance documents and verification
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Documents</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <p className="text-2xl font-bold">{stats.pending}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <FileCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Submitted</p>
                            <p className="text-2xl font-bold">{stats.submitted}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Verified</p>
                            <p className="text-2xl font-bold">{stats.verified}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Documents Table */}
            <Card>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4 font-medium">Employee</th>
                                <th className="text-left p-4 font-medium">Document Type</th>
                                <th className="text-left p-4 font-medium">Status</th>
                                <th className="text-left p-4 font-medium">Submitted</th>
                                <th className="text-left p-4 font-medium">Verified</th>
                                <th className="text-left p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                                        No compliance documents yet
                                    </td>
                                </tr>
                            ) : (
                                documents.map((doc) => (
                                    <tr key={doc.id} className="border-b hover:bg-muted/50">
                                        <td className="p-4">
                                            <div>
                                                <div className="font-medium">
                                                    {doc.employee.firstName} {doc.employee.lastName}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {doc.employee.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline">{getTypeLabel(doc.type)}</Badge>
                                        </td>
                                        <td className="p-4">{getStatusBadge(doc.status)}</td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            {new Date(doc.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            {doc.verifiedAt ? new Date(doc.verifiedAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="p-4">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/compliance/${doc.id}`}>View</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y">
                    {documents.length === 0 ? (
                        <div className="text-center p-8 text-muted-foreground">
                            No compliance documents yet
                        </div>
                    ) : (
                        documents.map((doc) => (
                            <div key={doc.id} className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">
                                            {doc.employee.firstName} {doc.employee.lastName}
                                        </div>
                                        <div className="text-sm text-muted-foreground truncate">
                                            {doc.employee.email}
                                        </div>
                                    </div>
                                    {getStatusBadge(doc.status)}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">{getTypeLabel(doc.type)}</Badge>
                                </div>
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <div>Submitted: {new Date(doc.createdAt).toLocaleDateString()}</div>
                                    {doc.verifiedAt && (
                                        <div>Verified: {new Date(doc.verifiedAt).toLocaleDateString()}</div>
                                    )}
                                </div>
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={`/compliance/${doc.id}`}>View Details</Link>
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
