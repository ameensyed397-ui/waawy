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
        const { step } = body;

        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!employee?.companyId) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        await prisma.company.update({
            where: { id: employee.companyId },
            data: {
                lastSavedStep: step,
                onboardingStep: step,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving progress:", error);
        return NextResponse.json(
            { error: "Failed to save progress" },
            { status: 500 }
        );
    }
}
