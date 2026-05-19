import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateEmployeeSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    department: z.string().optional(),
    startDate: z.string().optional(),
    onboardingStatus: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const employee = await prisma.employee.findUnique({
            where: { id: params.id },
            include: {
                company: true,
                onboardingTasks: {
                    orderBy: { createdAt: 'asc' },
                },
                complianceDocs: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        // Verify user has access
        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!currentEmployee || currentEmployee.companyId !== employee.companyId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            employee,
        });
    } catch (error) {
        console.error('Error fetching employee:', error);
        return NextResponse.json(
            { error: 'Failed to fetch employee' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Verify user has access
        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        const targetEmployee = await prisma.employee.findUnique({
            where: { id: params.id },
        });

        if (!currentEmployee || !targetEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        if (currentEmployee.companyId !== targetEmployee.companyId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        // Only allow self-update or admin/founder update
        const canUpdate =
            currentEmployee.id === params.id ||
            ['FOUNDER', 'ADMIN'].includes(currentEmployee.role);

        if (!canUpdate) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = updateEmployeeSchema.parse(body);

        const employee = await prisma.employee.update({
            where: { id: params.id },
            data: {
                ...validatedData,
                startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
            },
        });

        return NextResponse.json({
            success: true,
            employee,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error updating employee:', error);
        return NextResponse.json(
            { error: 'Failed to update employee' },
            { status: 500 }
        );
    }
}
