-- CreateTable
CREATE TABLE "GameStateLog" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameStateLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameStateLog_state_key" ON "GameStateLog"("state");
