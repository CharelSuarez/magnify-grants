-- CreateTable
CREATE TABLE "req_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "prompt" TEXT NOT NULL,
    "grantId" UUID,

    CONSTRAINT "req_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "req_documents_id_key" ON "req_documents"("id");

-- AddForeignKey
ALTER TABLE "req_documents" ADD CONSTRAINT "req_documents_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "grants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
