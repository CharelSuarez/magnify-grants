-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_submissionId_fkey";

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
