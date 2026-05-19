import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ needsOnboarding: false });
        }

        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
            include: { company: true },
        });

        // If no employee record or no company, needs onboarding
        if (!employee || !employee.company) {
            return NextResponse.json({
                needsOnboarding: true,
                currentStep: 1
            });
        }

        // If company exists but onboarding not complete
        if (employee.company.onboardingStatus !== 'COMPLETED') {
            const currentStep = employee.company.lastSavedStep || employee.company.onboardingStep || 1;
            return NextResponse.json({
                needsOnboarding: true,
                currentStep
            });
        }

        // Onboarding complete
        return NextResponse.json({ needsOnboarding: false });
    } catch (error) {
        console.error("Error checking onboarding status:", error);
        return NextResponse.json({ needsOnboarding: false });
    }
}
