import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createTaskSchema = z.object({
    employeeId: z.string(),
    phase: z.enum(['PRE_ONBOARDING', 'DURING_ONBOARDING', 'POST_ONBOARDING']),
    title: z.string(),
    description: z.string().optional(),
    dueDate: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = createTaskSchema.parse(body);

        // Verify user has access
        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        const targetEmployee = await prisma.employee.findUnique({
            where: { id: validatedData.employeeId },
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

        // Only admins/founders can create tasks
        if (!['FOUNDER', 'ADMIN'].includes(currentEmployee.role)) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const task = await prisma.onboardingTask.create({
            data: {
                employeeId: validatedData.employeeId,
                phase: validatedData.phase,
                title: validatedData.title,
                description: validatedData.description,
                dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
            },
        });

        return NextResponse.json({
            success: true,
            task,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating task:', error);
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const employeeId = searchParams.get('employeeId');

        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!currentEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        const tasks = await prisma.onboardingTask.findMany({
            where: employeeId
                ? { employeeId }
                : {
                    employee: {
                        companyId: currentEmployee.companyId,
                    },
                },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}
