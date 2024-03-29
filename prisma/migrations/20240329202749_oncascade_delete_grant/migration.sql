-- DropForeignKey
ALTER TABLE "forms_on_grants" DROP CONSTRAINT "forms_on_grants_grantId_fkey";

-- AddForeignKey
ALTER TABLE "forms_on_grants" ADD CONSTRAINT "forms_on_grants_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
