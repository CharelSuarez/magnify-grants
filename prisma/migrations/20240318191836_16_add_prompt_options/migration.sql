/*
  Warnings:

  - You are about to drop the column `values` on the `fields` table. All the data in the column will be lost.
  - You are about to drop the column `values2` on the `fields` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fields" DROP COLUMN "values",
DROP COLUMN "values2",
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "prompt" TEXT NOT NULL;
