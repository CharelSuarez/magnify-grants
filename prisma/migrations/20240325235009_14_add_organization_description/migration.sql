/*
  Warnings:

  - The values [MultipleChoiceGrid,CheckboxGrid] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.

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
ALTER TABLE "organizations" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
