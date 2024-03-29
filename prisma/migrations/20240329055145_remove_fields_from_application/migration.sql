/*
  Warnings:

  - You are about to drop the column `amountAwarded` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `submissionDate` on the `applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "amountAwarded",
DROP COLUMN "status",
DROP COLUMN "submissionDate";
