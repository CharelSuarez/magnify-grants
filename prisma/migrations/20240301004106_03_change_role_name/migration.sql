/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('GRANT_USER', 'GRANT_ADMIN', 'SYS_ADMIN');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'GRANT_USER';

-- DropEnum
DROP TYPE "roles";
