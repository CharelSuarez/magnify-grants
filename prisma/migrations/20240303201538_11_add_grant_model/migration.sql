-- CreateTable
CREATE TABLE "grants" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "acceptingApplications" BOOLEAN NOT NULL DEFAULT false,
    "rangeLow" INTEGER NOT NULL DEFAULT 0,
    "rangeHigh" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "grants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grants_id_key" ON "grants"("id");
