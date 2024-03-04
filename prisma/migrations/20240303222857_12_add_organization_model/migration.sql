/*
  Warnings:

  - Added the required column `organizationId` to the `grants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grants" ADD COLUMN     "organizationId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_key" ON "organizations"("id");

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
