import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { vote, roast } = await req.json();

        if (!vote || typeof vote !== 'string') {
            return NextResponse.json({ error: 'Vote is required' }, { status: 400 });
        }

        await prisma.pollResponse.create({
            data: {
                vote,
                roast: roast || null,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[poll] Error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
