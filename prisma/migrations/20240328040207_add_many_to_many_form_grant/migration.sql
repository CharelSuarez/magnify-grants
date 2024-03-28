/*
  Warnings:

  - You are about to drop the column `grantId` on the `forms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "forms" DROP CONSTRAINT "forms_grantId_fkey";

-- DropIndex
DROP INDEX "forms_grantId_key";

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "grantId";

-- CreateTable
CREATE TABLE "forms_on_grants" (
    "grantId" UUID NOT NULL,
    "formId" UUID NOT NULL,

    CONSTRAINT "forms_on_grants_pkey" PRIMARY KEY ("grantId","formId")
);

-- AddForeignKey
ALTER TABLE "forms_on_grants" ADD CONSTRAINT "forms_on_grants_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms_on_grants" ADD CONSTRAINT "forms_on_grants_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
