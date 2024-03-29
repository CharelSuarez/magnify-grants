/*
  Warnings:

  - Made the column `grantId` on table `applications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "applications" ALTER COLUMN "grantId" SET NOT NULL;
