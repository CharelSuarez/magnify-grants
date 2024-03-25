/*
  Warnings:

  - You are about to drop the column `draft` on the `applications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "draft",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT true;
