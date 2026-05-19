-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "fiscalYearStart" INTEGER,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "workWeekStart" TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "profilePicture" TEXT;

-- CreateTable
CREATE TABLE "LeavePolicy" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT,
    "allowanceDays" DOUBLE PRECISION NOT NULL,
    "carryoverDays" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT true,
    "paidLeave" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "isStatutory" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeavePolicy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeavePolicy" ADD CONSTRAINT "LeavePolicy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
