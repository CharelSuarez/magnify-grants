/*
  Warnings:

  - A unique constraint covering the columns `[grantId,userId,formId,submissionId]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "applications_grantId_userId_formId_updated_idx";

-- DropIndex
DROP INDEX "applications_grantId_userId_formId_updated_key";

-- DropIndex
DROP INDEX "applications_submissionId_key";

-- CreateIndex
CREATE INDEX "applications_grantId_userId_formId_idx" ON "applications"("grantId", "userId", "formId");

-- CreateIndex
CREATE INDEX "applications_grantId_userId_formId_submissionId_idx" ON "applications"("grantId", "userId", "formId", "submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "applications_grantId_userId_formId_submissionId_key" ON "applications"("grantId", "userId", "formId", "submissionId");
