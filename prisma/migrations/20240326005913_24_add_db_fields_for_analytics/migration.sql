/*
  Warnings:

  - You are about to drop the column `values2` on the `fields` table. All the data in the column will be lost.
  - Added the required column `amountAwarded` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `grants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "sector" AS ENUM ('AGRICULTURE', 'ARTS', 'BUSINESS', 'EDUCATION', 'ENVIRONMENT', 'HEALTH', 'SCIENCE_TECHNOLOGY', 'OTHER');

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "amountAwarded" INTEGER NOT NULL,
ADD COLUMN     "submissionDate" TIMESTAMP(3),
ALTER COLUMN "complete" SET DEFAULT false;

-- AlterTable
ALTER TABLE "fields" DROP COLUMN "values2";

-- AlterTable
ALTER TABLE "grants" ADD COLUMN     "sector" "sector" NOT NULL;
