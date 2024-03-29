/*
  Warnings:

  - Made the column `submissionDate` on table `submissions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "submissions" ALTER COLUMN "submissionDate" SET NOT NULL,
ALTER COLUMN "submissionDate" SET DEFAULT CURRENT_TIMESTAMP;
