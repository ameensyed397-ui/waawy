import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { loops, LOOPS_TEMPLATES } from '@/lib/email';

const createInvitesSchema = z.object({
    companyId: z.string(),
    invites: z.array(
        z.object({
            email: z.string().email(),
            role: z.enum(['EMPLOYEE', 'MANAGER', 'ADMIN']),
        })
    ),
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const validatedData = createInvitesSchema.parse(body);

        // Verify user has access to this company and get company details
        const employee = await prisma.employee.findFirst({
            where: {
                clerkUserId: userId,
                companyId: validatedData.companyId,
                role: { in: ['FOUNDER', 'ADMIN'] },
            },
            include: {
                company: true,
            },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const companyName = employee.company.name;
        const inviterName = `${employee.firstName} ${employee.lastName}`;

        // Create invites
        const invites = await Promise.all(
            validatedData.invites.map(async (invite) => {
                const token = randomBytes(32).toString('hex');
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 7);

                return prisma.invite.create({
                    data: {
                        companyId: validatedData.companyId,
                        email: invite.email,
                        role: invite.role,
                        token,
                        expiresAt,
                    },
                });
            })
        );

        // Send invitation emails via Loops
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://getwaawy.com';
        const expiresInDays = 7;

        const emailResults = await Promise.allSettled(
            invites.map(async (invite) => {
                const inviteLink = `${appUrl}/invite/${invite.token}`;

                try {
                    await loops.sendTransactionalEmail({
                        transactionalId: LOOPS_TEMPLATES.invite,
                        email: invite.email,
                        addToAudience: true,
                        dataVariables: {
                            companyName,
                            inviterName,
                            inviteLink,
                            expiresInDays: String(expiresInDays),
                        },
                    });

                    return { email: invite.email, sent: true };
                } catch (emailError) {
                    console.error(`Failed to send email to ${invite.email}:`, emailError);
                    return { email: invite.email, sent: false, error: emailError };
                }
            })
        );

        const inviteLinks = invites.map((invite, index) => ({
            email: invite.email,
            link: `${appUrl}/invite/${invite.token}`,
            emailSent: emailResults[index].status === 'fulfilled' &&
                (emailResults[index].value as { email: string; sent: boolean }).sent,
        }));

        return NextResponse.json({
            success: true,
            invites,
            inviteLinks,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Error creating invites:', error);
        return NextResponse.json(
            { error: 'Failed to create invites' },
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

        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'No company found' },
                { status: 404 }
            );
        }

        const invites = await prisma.invite.findMany({
            where: { companyId: employee.companyId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            invites,
        });
    } catch (error) {
        console.error('Error fetching invites:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invites' },
            { status: 500 }
        );
    }
}
