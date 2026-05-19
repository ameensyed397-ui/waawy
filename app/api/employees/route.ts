import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get all employees for user's company
        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!currentEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        const employees = await prisma.employee.findMany({
            where: { companyId: currentEmployee.companyId },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                department: true,
                startDate: true,
                onboardingStatus: true,
                createdAt: true,
            },
        });

        return NextResponse.json({
            success: true,
            employees,
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        return NextResponse.json(
            { error: 'Failed to fetch employees' },
            { status: 500 }
        );
    }
}
