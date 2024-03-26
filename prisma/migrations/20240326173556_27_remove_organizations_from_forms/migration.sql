/*
  Warnings:

  - You are about to drop the column `organizationId` on the `forms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_organizationId_fkey";

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "organizationId";
