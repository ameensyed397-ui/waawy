"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, UserPlus, Mail } from "lucide-react";
import Link from "next/link";

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string | null;
    onboardingStatus: string;
    startDate: string | null;
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees');
            const data = await response.json();

            if (data.success) {
                setEmployees(data.employees);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = employees.filter((emp) =>
        `${emp.firstName} ${emp.lastName} ${emp.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "outline"> = {
            PENDING: "outline",
            IN_PROGRESS: "secondary",
            COMPLETED: "default",
        };

        return (
            <Badge variant={variants[status] || "outline"}>
                {status.replace('_', ' ')}
            </Badge>
        );
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
                    <h1 className="text-2xl sm:text-3xl font-bold">Employees</h1>
                    <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                        Manage your team members and their onboarding
                    </p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/employees/invite">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Employee
                    </Link>
                </Button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Employees</p>
                            <p className="text-2xl font-bold">{employees.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Onboarding</p>
                            <p className="text-2xl font-bold">
                                {employees.filter((e) => e.onboardingStatus === 'IN_PROGRESS').length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Active</p>
                            <p className="text-2xl font-bold">
                                {employees.filter((e) => e.onboardingStatus === 'COMPLETED').length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Employee List */}
            <Card>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4 font-medium">Name</th>
                                <th className="text-left p-4 font-medium">Email</th>
                                <th className="text-left p-4 font-medium">Role</th>
                                <th className="text-left p-4 font-medium">Department</th>
                                <th className="text-left p-4 font-medium">Status</th>
                                <th className="text-left p-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-muted-foreground">
                                        {searchQuery ? 'No employees found' : 'No employees yet'}
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id} className="border-b hover:bg-muted/50">
                                        <td className="p-4">
                                            <div className="font-medium">
                                                {employee.firstName} {employee.lastName}
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{employee.email}</td>
                                        <td className="p-4">
                                            <Badge variant="outline">{employee.role}</Badge>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {employee.department || '-'}
                                        </td>
                                        <td className="p-4">{getStatusBadge(employee.onboardingStatus)}</td>
                                        <td className="p-4">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/employees/${employee.id}`}>View</Link>
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
                    {filteredEmployees.length === 0 ? (
                        <div className="text-center p-8 text-muted-foreground">
                            {searchQuery ? 'No employees found' : 'No employees yet'}
                        </div>
                    ) : (
                        filteredEmployees.map((employee) => (
                            <div key={employee.id} className="p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="font-medium">
                                            {employee.firstName} {employee.lastName}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {employee.email}
                                        </div>
                                    </div>
                                    {getStatusBadge(employee.onboardingStatus)}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">{employee.role}</Badge>
                                    {employee.department && (
                                        <Badge variant="secondary">{employee.department}</Badge>
                                    )}
                                </div>
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={`/employees/${employee.id}`}>View Details</Link>
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
