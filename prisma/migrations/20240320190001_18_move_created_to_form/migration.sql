/*
  Warnings:

  - You are about to drop the column `createdAt` on the `fields` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "fields" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
