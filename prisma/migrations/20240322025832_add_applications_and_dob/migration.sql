/*
  Warnings:

  - The values [MultipleChoiceGrid,CheckboxGrid] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[grantId]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grantId` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FieldType_new" AS ENUM ('ShortAnswer', 'Paragraph', 'MultipleChoice', 'Checkbox', 'Dropdown', 'FileUpload', 'LinearScale', 'Date', 'Time');
ALTER TABLE "fields" ALTER COLUMN "type" TYPE "FieldType_new" USING ("type"::text::"FieldType_new");
ALTER TYPE "FieldType" RENAME TO "FieldType_old";
ALTER TYPE "FieldType_new" RENAME TO "FieldType";
DROP TYPE "FieldType_old";
COMMIT;

-- AlterTable
ALTER TABLE "fields" ADD COLUMN     "values2" TEXT[];

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "grantId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "dateOfBirth" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "formId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "appId" UUID NOT NULL,
    "fieldId" UUID NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "application_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "applications_userId_formId_idx" ON "applications"("userId", "formId");

-- CreateIndex
CREATE UNIQUE INDEX "applications_userId_formId_version_key" ON "applications"("userId", "formId", "version");

-- CreateIndex
CREATE INDEX "application_entries_appId_fieldId_idx" ON "application_entries"("appId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "application_entries_appId_fieldId_key" ON "application_entries"("appId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "forms_grantId_key" ON "forms"("grantId");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_entries" ADD CONSTRAINT "application_entries_appId_fkey" FOREIGN KEY ("appId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application_entries" ADD CONSTRAINT "application_entries_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;
