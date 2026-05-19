import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Region-based compliance requirements
const COMPLIANCE_PRESETS: Record<string, Array<{ type: string; title: string; description: string; required: boolean }>> = {
    UK: [
        {
            type: "RIGHT_TO_WORK",
            title: "Right to Work Verification",
            description: "Required for all UK employees to verify their legal right to work",
            required: true,
        },
        {
            type: "HMRC_STARTER",
            title: "HMRC Starter Checklist",
            description: "Tax information for PAYE (Pay As You Earn) system",
            required: true,
        },
        {
            type: "GDPR_CONSENT",
            title: "GDPR Consent Forms",
            description: "Employee data protection and privacy consent",
            required: true,
        },
        {
            type: "PENSION_AUTO_ENROLLMENT",
            title: "Pension Auto-Enrollment",
            description: "Workplace pension scheme enrollment (optional)",
            required: false,
        },
    ],
    US: [
        {
            type: "I9_VERIFICATION",
            title: "I-9 Employment Verification",
            description: "Verify identity and employment authorization",
            required: true,
        },
        {
            type: "W4_TAX_FORMS",
            title: "W-4 Tax Forms",
            description: "Federal tax withholding information",
            required: true,
        },
    ],
    EU: [
        {
            type: "GDPR_CONSENT",
            title: "GDPR Consent Forms",
            description: "Employee data protection and privacy consent",
            required: true,
        },
    ],
    OTHER: [
        {
            type: "GDPR_CONSENT",
            title: "Data Privacy Consent",
            description: "Employee data protection consent",
            required: true,
        },
    ],
};

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { companyName, industry, workModel, size, location, region } = body;

        // Find or create employee record
        const employee = await prisma.employee.findUnique({
            where: { clerkUserId: userId },
            include: { company: true },
        });

        let company;

        if (employee?.company) {
            // Update existing company
            company = await prisma.company.update({
                where: { id: employee.companyId },
                data: {
                    name: companyName,
                    industry,
                    workModel,
                    size,
                    location,
                    region,
                    onboardingStep: 2,
                    setupComplete: true,
                },
            });
        } else {
            // Create new company
            company = await prisma.company.create({
                data: {
                    name: companyName,
                    industry,
                    workModel,
                    size,
                    location,
                    region,
                    onboardingStatus: "IN_PROGRESS",
                    onboardingStep: 2,
                    setupComplete: true,
                },
            });

            // Create or update employee with company
            if (employee) {
                await prisma.employee.update({
                    where: { id: employee.id },
                    data: { companyId: company.id },
                });
            }
        }

        // Create compliance requirements based on region
        const requirements = COMPLIANCE_PRESETS[region] || COMPLIANCE_PRESETS.OTHER;

        // Delete existing requirements for this company
        await prisma.complianceRequirement.deleteMany({
            where: { companyId: company.id },
        });

        // Create new requirements
        await prisma.complianceRequirement.createMany({
            data: requirements.map(req => ({
                companyId: company.id,
                type: req.type,
                region,
                required: req.required,
                completed: false,
            })),
        });

        return NextResponse.json({ success: true, companyId: company.id });
    } catch (error) {
        console.error("Error in company setup:", error);
        return NextResponse.json(
            { error: "Failed to save company setup" },
            { status: 500 }
        );
    }
}
