import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ token: string }> }
) {
    const params = await props.params;
    try {
        const invite = await prisma.invite.findUnique({
            where: { token: params.token },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        workModel: true,
                    },
                },
            },
        });

        if (!invite) {
            return NextResponse.json(
                { error: 'Invite not found' },
                { status: 404 }
            );
        }

        // Check if invite is expired
        if (new Date() > invite.expiresAt) {
            return NextResponse.json(
                { error: 'Invite has expired' },
                { status: 410 }
            );
        }

        // Check if already accepted
        if (invite.acceptedAt) {
            return NextResponse.json(
                { error: 'Invite already accepted' },
                { status: 409 }
            );
        }

        return NextResponse.json({
            success: true,
            invite,
        });
    } catch (error) {
        console.error('Error fetching invite:', error);
        return NextResponse.json(
            { error: 'Failed to fetch invite' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    props: { params: Promise<{ token: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const { clerkUserId, firstName, lastName, email } = body;

        if (!clerkUserId || !firstName || !lastName || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Find invite
        const invite = await prisma.invite.findUnique({
            where: { token: params.token },
        });

        if (!invite) {
            return NextResponse.json(
                { error: 'Invite not found' },
                { status: 404 }
            );
        }

        // Check if expired
        if (new Date() > invite.expiresAt) {
            return NextResponse.json(
                { error: 'Invite has expired' },
                { status: 410 }
            );
        }

        // Check if already accepted
        if (invite.acceptedAt) {
            return NextResponse.json(
                { error: 'Invite already accepted' },
                { status: 409 }
            );
        }

        // Create employee record
        const employee = await prisma.employee.create({
            data: {
                clerkUserId,
                companyId: invite.companyId,
                firstName,
                lastName,
                email,
                role: invite.role,
            },
        });

        // Mark invite as accepted
        await prisma.invite.update({
            where: { id: invite.id },
            data: { acceptedAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            employee,
        });
    } catch (error) {
        console.error('Error accepting invite:', error);
        return NextResponse.json(
            { error: 'Failed to accept invite' },
            { status: 500 }
        );
    }
}
