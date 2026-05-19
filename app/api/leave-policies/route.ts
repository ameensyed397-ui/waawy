import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const leavePolicySchema = z.object({
  name: z.string().min(1).max(100),
  emoji: z.string().optional(),
  allowanceDays: z.number().min(0).max(365),
  carryoverDays: z.number().min(0).max(365).optional().default(0),
  requiresApproval: z.boolean().default(true),
  paidLeave: z.boolean().default(true),
  description: z.string().optional(),
  isStatutory: z.boolean().default(false),
});

const createLeavePoliciesSchema = z.object({
  companyId: z.string(),
  policies: z.array(leavePolicySchema),
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
    const validatedData = createLeavePoliciesSchema.parse(body);

    // Verify user has access to this company
    const employee = await prisma.employee.findFirst({
      where: {
        clerkUserId: userId,
        companyId: validatedData.companyId,
        role: { in: ['FOUNDER', 'ADMIN'] },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Create leave policies
    const createdPolicies = await Promise.all(
      validatedData.policies.map((policy) =>
        prisma.leavePolicy.create({
          data: {
            companyId: validatedData.companyId,
            ...policy,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      policies: createdPolicies,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating leave policies:', error);
    return NextResponse.json(
      { error: 'Failed to create leave policies' },
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

    // Get user's company
    const employee = await prisma.employee.findUnique({
      where: { clerkUserId: userId },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'No company found' },
        { status: 404 }
      );
    }

    // Get all leave policies for the company
    const policies = await prisma.leavePolicy.findMany({
      where: { companyId: employee.companyId },
      orderBy: { isStatutory: 'desc' }, // Show statutory policies first
    });

    return NextResponse.json({
      success: true,
      policies,
    });
  } catch (error) {
    console.error('Error fetching leave policies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave policies' },
      { status: 500 }
    );
  }
}
