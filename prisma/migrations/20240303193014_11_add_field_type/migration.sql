-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('ShortAnswer', 'Paragraph', 'MultipleChoice', 'Checkbox', 'Dropdown', 'FileUpload', 'LinearScale', 'MultipleChoiceGrid', 'CheckboxGrid', 'Date', 'Time');

-- CreateTable
CREATE TABLE "forms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "FieldType" NOT NULL,
    "formId" UUID NOT NULL,
    "values" TEXT[],

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
