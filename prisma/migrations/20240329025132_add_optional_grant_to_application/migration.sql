/*
  Warnings:

  - A unique constraint covering the columns `[grantId,userId,formId,updated]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "applications_userId_formId_updated_idx";

-- DropIndex
DROP INDEX "applications_userId_formId_updated_key";

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "grantId" UUID;

-- CreateIndex
CREATE INDEX "applications_grantId_userId_formId_updated_idx" ON "applications"("grantId", "userId", "formId", "updated");

-- CreateIndex
CREATE UNIQUE INDEX "applications_grantId_userId_formId_updated_key" ON "applications"("grantId", "userId", "formId", "updated");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
