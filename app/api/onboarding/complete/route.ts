import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
        });

        if (!employee?.companyId) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        await prisma.company.update({
            where: { id: employee.companyId },
            data: {
                onboardingStatus: "COMPLETED",
                onboardingStep: 4,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error completing onboarding:", error);
        return NextResponse.json(
            { error: "Failed to complete onboarding" },
            { status: 500 }
        );
    }
}
