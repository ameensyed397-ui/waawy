import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const createCompanySchema = z.object({
    name: z.string().min(1, 'Company name is required'),
    workModel: z.enum(['REMOTE', 'HYBRID', 'OFFICE']).optional().default('REMOTE'),
    industry: z.string().optional(),
    size: z.string().optional(),
    country: z.string().default('UK'),
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
        const validatedData = createCompanySchema.parse(body);

        // Create company
        const company = await prisma.company.create({
            data: {
                name: validatedData.name,
                workModel: validatedData.workModel || 'REMOTE',
                industry: validatedData.industry,
                size: validatedData.size,
                region: validatedData.country,
            },
        });

        // Create employee record for the founder
        const user = await auth();
        const employee = await prisma.employee.create({
            data: {
                clerkUserId: userId,
                companyId: company.id,
                firstName: user.sessionClaims?.firstName as string || '',
                lastName: user.sessionClaims?.lastName as string || '',
                email: user.sessionClaims?.email as string || '',
                role: 'FOUNDER',
            },
        });

        return NextResponse.json({
            success: true,
            company,
            employee,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating company:', error);
        return NextResponse.json(
            { error: 'Failed to create company' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Find employee record for this user
        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
            include: { company: true },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'No company found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            company: employee.company,
            employee,
        });
    } catch (error) {
        console.error('Error fetching company:', error);
        return NextResponse.json(
            { error: 'Failed to fetch company' },
            { status: 500 }
        );
    }
}
