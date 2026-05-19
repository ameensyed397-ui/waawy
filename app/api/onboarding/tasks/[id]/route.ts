import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateTaskSchema = z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    completedAt: z.string().optional(),
});

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

        const body = await request.json();
        const validatedData = updateTaskSchema.parse(body);

        const task = await prisma.onboardingTask.findUnique({
            where: { id: params.id },
            include: { employee: true },
        });

        if (!task) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }

        // Verify user has access
        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!currentEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        if (currentEmployee.companyId !== task.employee.companyId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        // Update task
        const updatedTask = await prisma.onboardingTask.update({
            where: { id: params.id },
            data: {
                status: validatedData.status,
                completedAt: validatedData.completedAt
                    ? new Date(validatedData.completedAt)
                    : validatedData.status === 'COMPLETED'
                        ? new Date()
                        : null,
            },
        });

        return NextResponse.json({
            success: true,
            task: updatedTask,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}
