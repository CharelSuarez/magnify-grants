/*
  Warnings:

  - The primary key for the `application_entries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `application_entries` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `applications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,formId]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "applications_userId_formId_version_key";

-- AlterTable
ALTER TABLE "application_entries" DROP CONSTRAINT "application_entries_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "version",
ADD COLUMN     "dateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_formId_key" ON "applications"("userId", "formId");
