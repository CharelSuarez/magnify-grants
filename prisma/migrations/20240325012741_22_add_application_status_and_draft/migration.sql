-- CreateEnum
CREATE TYPE "application_status" AS ENUM ('REJECTED', 'IN_PROGRESS', 'ACCEPTED');

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "application_status" NOT NULL DEFAULT 'IN_PROGRESS';
