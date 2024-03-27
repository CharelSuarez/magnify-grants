-- CreateTable
CREATE TABLE "GrantAdmin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,

    CONSTRAINT "GrantAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrantAdmin_id_key" ON "GrantAdmin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GrantAdmin_userId_key" ON "GrantAdmin"("userId");

-- AddForeignKey
ALTER TABLE "GrantAdmin" ADD CONSTRAINT "GrantAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantAdmin" ADD CONSTRAINT "GrantAdmin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
