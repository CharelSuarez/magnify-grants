/*
  Warnings:

  - The values [MultipleChoiceGrid,CheckboxGrid] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `organizationId` to the `forms` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "fields" ADD COLUMN  IF NOT EXISTS    "values2" TEXT[];

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "organizationId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
