/*
  Warnings:

  - You are about to drop the `GrantAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GrantAdmin" DROP CONSTRAINT "GrantAdmin_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "GrantAdmin" DROP CONSTRAINT "GrantAdmin_userId_fkey";

-- DropTable
DROP TABLE "GrantAdmin";

-- CreateTable
CREATE TABLE "grant_admins" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,

    CONSTRAINT "grant_admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grant_admins_id_key" ON "grant_admins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "grant_admins_userId_key" ON "grant_admins"("userId");

-- AddForeignKey
ALTER TABLE "grant_admins" ADD CONSTRAINT "grant_admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_admins" ADD CONSTRAINT "grant_admins_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
