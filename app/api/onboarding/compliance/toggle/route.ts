import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, completed } = body;

        await prisma.complianceRequirement.update({
            where: { id },
            data: { completed },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error toggling compliance requirement:", error);
        return NextResponse.json(
            { error: "Failed to toggle requirement" },
            { status: 500 }
        );
    }
}
