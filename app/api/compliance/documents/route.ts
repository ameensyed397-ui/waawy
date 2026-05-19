import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createComplianceDocSchema = z.object({
    employeeId: z.string(),
    type: z.enum(['RIGHT_TO_WORK', 'HMRC_STARTER', 'GDPR_CONSENT']),
    documentUrl: z.string().optional(),
    expiryDate: z.string().optional(),
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
        const validatedData = createComplianceDocSchema.parse(body);

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

        // Create compliance document
        const document = await prisma.complianceDocument.create({
            data: {
                employeeId: validatedData.employeeId,
                type: validatedData.type,
                documentUrl: validatedData.documentUrl,
                expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
                status: validatedData.documentUrl ? 'SUBMITTED' : 'PENDING',
            },
        });

        return NextResponse.json({
            success: true,
            document,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating compliance document:', error);
        return NextResponse.json(
            { error: 'Failed to create compliance document' },
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
        const type = searchParams.get('type');

        const currentEmployee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!currentEmployee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        const documents = await prisma.complianceDocument.findMany({
            where: {
                employee: {
                    companyId: currentEmployee.companyId,
                },
                ...(employeeId && { employeeId }),
                ...(type && { type: type as 'RIGHT_TO_WORK' | 'HMRC_STARTER' | 'GDPR_CONSENT' }),
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            documents,
        });
    } catch (error: unknown) {
        console.error('Error fetching compliance documents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch compliance documents' },
            { status: 500 }
        );
    }
}
