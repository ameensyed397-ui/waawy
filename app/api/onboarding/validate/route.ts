import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const REQUIREMENT_TITLES: Record<string, string> = {
    RIGHT_TO_WORK: "Right to Work Verification",
    HMRC_STARTER: "HMRC Starter Checklist",
    GDPR_CONSENT: "GDPR Consent Forms",
    PENSION_AUTO_ENROLLMENT: "Pension Auto-Enrollment",
    I9_VERIFICATION: "I-9 Employment Verification",
    W4_TAX_FORMS: "W-4 Tax Forms",
};

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
            include: {
                company: {
                    include: {
                        complianceRequirements: true,
                    },
                },
            },
        });

        if (!employee?.company) {
            console.log("Validation: Company not found for user", userId);
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        const requirements = employee.company.complianceRequirements;
        console.log(`Validation: Found ${requirements.length} requirements for company ${employee.company.id}`);

        const requiredRequirements = requirements.filter(r => r.required);
        const completedRequired = requiredRequirements.filter(r => r.completed);

        const isComplete = completedRequired.length === requiredRequirements.length;

        const missingItems = requiredRequirements
            .filter(r => !r.completed)
            .map(r => REQUIREMENT_TITLES[r.type] || r.type);

        const completedItems = requirements
            .filter(r => r.completed)
            .map(r => REQUIREMENT_TITLES[r.type] || r.type);

        // Update company compliance status
        await prisma.company.update({
            where: { id: employee.company.id },
            data: {
                complianceComplete: isComplete,
                onboardingStep: 3,
            },
        });

        return NextResponse.json({
            isComplete,
            missingItems,
            completedItems,
        });
    } catch (error) {
        console.error("Error validating onboarding:", error);
        return NextResponse.json(
            { error: "Failed to validate onboarding" },
            { status: 500 }
        );
    }
}
