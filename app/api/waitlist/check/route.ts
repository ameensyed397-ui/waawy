import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
        return NextResponse.json({ exists: false });
    }

    try {
        const entry = await prisma.waitlist.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        return NextResponse.json({ exists: !!entry });
    } catch {
        return NextResponse.json({ exists: false });
    }
}
