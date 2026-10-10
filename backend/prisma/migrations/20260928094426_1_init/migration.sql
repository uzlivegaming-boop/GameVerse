
CREATE TABLE IF NOT EXISTS "Games" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'Other',
  "platform" TEXT,
  "downloadUrl" TEXT,
  "rating" DOUBLE PRECISION,
  "downloadCount" INTEGER NOT NULL DEFAULT 0,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Games_userId_createdAt_idx"
ON "Games"("userId", "createdAt");
