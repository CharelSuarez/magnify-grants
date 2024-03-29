/*
  Warnings:

  - You are about to drop the column `dateSubmitted` on the `applications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,formId,updated]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "applications_userId_formId_idx";

-- DropIndex
DROP INDEX "applications_userId_formId_key";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "dateSubmitted",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "applications_userId_formId_updated_idx" ON "applications"("userId", "formId", "updated");

-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_formId_updated_key" ON "applications"("userId", "formId", "updated");
