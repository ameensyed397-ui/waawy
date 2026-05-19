import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateCompanySchema = z.object({
    name: z.string().min(1).optional(),
    workModel: z.enum(['REMOTE', 'HYBRID', 'OFFICE']).optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
    country: z.string().optional(),
    // Workspace preferences
    timezone: z.string().optional(),
    currency: z.string().optional(),
    fiscalYearStart: z.number().min(1).max(12).optional(),
    workWeekStart: z.string().optional(),
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

        const company = await prisma.company.findUnique({
            where: { id: params.id },
            include: {
                employees: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                        department: true,
                        onboardingStatus: true,
                    },
                },
            },
        });

        if (!company) {
            return NextResponse.json(
                { error: 'Company not found' },
                { status: 404 }
            );
        }

        // Verify user has access to this company
        const employee = await prisma.employee.findFirst({
            where: {
                clerkUserId: userId,
                companyId: params.id,
            },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            company,
        });
    } catch (error) {
        console.error('Error fetching company:', error);
        return NextResponse.json(
            { error: 'Failed to fetch company' },
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

        // Verify user is admin/founder
        const employee = await prisma.employee.findFirst({
            where: {
                clerkUserId: userId,
                companyId: params.id,
                role: { in: ['FOUNDER', 'ADMIN'] },
            },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = updateCompanySchema.parse(body);

        const company = await prisma.company.update({
            where: { id: params.id },
            data: validatedData,
        });

        return NextResponse.json({
            success: true,
            company,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error updating company:', error);
        return NextResponse.json(
            { error: 'Failed to update company' },
            { status: 500 }
        );
    }
}
