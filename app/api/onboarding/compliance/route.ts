import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const REQUIREMENT_TITLES: Record<string, { title: string; description: string }> = {
    RIGHT_TO_WORK: {
        title: "Right to Work Verification",
        description: "Required for all UK employees to verify their legal right to work",
    },
    HMRC_STARTER: {
        title: "HMRC Starter Checklist",
        description: "Tax information for PAYE (Pay As You Earn) system",
    },
    GDPR_CONSENT: {
        title: "GDPR Consent Forms",
        description: "Employee data protection and privacy consent",
    },
    PENSION_AUTO_ENROLLMENT: {
        title: "Pension Auto-Enrollment",
        description: "Workplace pension scheme enrollment",
    },
    I9_VERIFICATION: {
        title: "I-9 Employment Verification",
        description: "Verify identity and employment authorization",
    },
    W4_TAX_FORMS: {
        title: "W-4 Tax Forms",
        description: "Federal tax withholding information",
    },
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
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        const requirements = employee.company.complianceRequirements.map(req => ({
            id: req.id,
            type: req.type,
            region: req.region,
            required: req.required,
            completed: req.completed,
            title: REQUIREMENT_TITLES[req.type]?.title || req.type,
            description: REQUIREMENT_TITLES[req.type]?.description || "",
        }));

        return NextResponse.json({
            requirements,
            region: employee.company.region,
        });
    } catch (error) {
        console.error("Error fetching compliance requirements:", error);
        return NextResponse.json(
            { error: "Failed to fetch requirements" },
            { status: 500 }
        );
    }
}
