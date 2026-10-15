CREATE TABLE "GameComment" (
    "id" SERIAL NOT NULL,
    "gameKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL DEFAULT 'GameVerse foydalanuvchisi',
    "content" VARCHAR(1000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameComment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "GameComment_gameKey_createdAt_idx"
ON "GameComment"("gameKey", "createdAt");