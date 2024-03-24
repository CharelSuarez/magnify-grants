/*
  Warnings:

  - Added the required column `index` to the `fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fields" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "index" INTEGER NOT NULL;
