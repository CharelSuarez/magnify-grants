-- DropIndex
DROP INDEX "application_entries_appId_fieldId_idx";

-- DropIndex
DROP INDEX "application_entries_appId_fieldId_key";

-- AlterTable
ALTER TABLE "application_entries" ADD CONSTRAINT "application_entries_pkey" PRIMARY KEY ("appId", "fieldId");
