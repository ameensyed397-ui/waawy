import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateComplianceDocSchema = z.object({
    status: z.enum(['PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED']).optional(),
    documentUrl: z.string().optional(),
    verifiedBy: z.string().optional(),
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
        const validatedData = updateComplianceDocSchema.parse(body);

        const document = await prisma.complianceDocument.findUnique({
            where: { id: params.id },
            include: { employee: true },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
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

        if (currentEmployee.companyId !== document.employee.companyId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        // Only admins/founders can verify documents
        if (
            validatedData.status === 'VERIFIED' &&
            !['FOUNDER', 'ADMIN'].includes(currentEmployee.role)
        ) {
            return NextResponse.json(
                { error: 'Only admins can verify documents' },
                { status: 403 }
            );
        }

        const updatedDocument = await prisma.complianceDocument.update({
            where: { id: params.id },
            data: {
                ...validatedData,
                verifiedAt: validatedData.status === 'VERIFIED' ? new Date() : null,
                verifiedBy: validatedData.status === 'VERIFIED' ? userId : null,
            },
        });

        return NextResponse.json({
            success: true,
            document: updatedDocument,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error updating compliance document:', error);
        return NextResponse.json(
            { error: 'Failed to update compliance document' },
            { status: 500 }
        );
    }
}
