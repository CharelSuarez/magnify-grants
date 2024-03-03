/*
  Warnings:

  - You are about to drop the column `expires_at` on the `email_verification_codes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `email_verification_codes` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `email_verification_codes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiresAt` to the `email_verification_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `email_verification_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "email_verification_codes" DROP CONSTRAINT "email_verification_codes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "email_verification_codes_user_id_key";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- AlterTable
ALTER TABLE "email_verification_codes" DROP COLUMN "expires_at",
DROP COLUMN "user_id",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "user_id",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "expires_at",
DROP COLUMN "user_id",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
DROP COLUMN "hashed_password",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hashedPassword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_codes_userId_key" ON "email_verification_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "email_verification_codes" ADD CONSTRAINT "email_verification_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
