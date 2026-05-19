import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loops, LOOPS_TEMPLATES } from '@/lib/email';

// ── POST /api/waitlist — add email + send welcome ──────────
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // Validate
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        const normalised = email.toLowerCase().trim();

        // Check for duplicate
        const existing = await prisma.waitlist.findUnique({
            where: { email: normalised },
        });

        if (existing) {
            // If email was never sent (e.g. previous failure), retry now
            if (!existing.emailSent) {
                try {
                    await loops.sendTransactionalEmail({
                        transactionalId: LOOPS_TEMPLATES.waitlistWelcome,
                        email: normalised,
                        addToAudience: true,
                        dataVariables: {
                            email: normalised,
                        },
                    });

                    await prisma.waitlist.update({
                        where: { id: existing.id },
                        data: { emailSent: true },
                    });
                } catch (emailError) {
                    console.error('[waitlist] Failed to resend welcome email:', emailError);
                }
            }

            return NextResponse.json(
                { error: 'already_exists', message: "You're already on our list!" },
                { status: 409 }
            );
        }

        // Save to DB
        const entry = await prisma.waitlist.create({
            data: { email: normalised },
        });

        // Send welcome email via Loops (non-blocking)
        try {
            await loops.sendTransactionalEmail({
                transactionalId: LOOPS_TEMPLATES.waitlistWelcome,
                email: normalised,
                addToAudience: true,
                dataVariables: {
                    email: normalised,
                },
            });

            // Mark email as sent
            await prisma.waitlist.update({
                where: { id: entry.id },
                data: { emailSent: true },
            });
        } catch (emailError) {
            console.error('[waitlist] Failed to send welcome email:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: "You're on the list!",
        });
    } catch (error) {
        console.error('[waitlist] Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}

// ── GET /api/waitlist — count (for counter display) ────────
export async function GET() {
    try {
        const count = await prisma.waitlist.count();
        return NextResponse.json({ count });
    } catch {
        return NextResponse.json({ count: 0 });
    }
}
