/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('GRANT_USER', 'GRANT_ADMIN', 'SYS_ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'GRANT_USER';

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
