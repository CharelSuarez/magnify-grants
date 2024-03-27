/*
  Warnings:

  - Made the column `dateOfBirth` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "organizationId" UUID;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET DATA TYPE DATE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
