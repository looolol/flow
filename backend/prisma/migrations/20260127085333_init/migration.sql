-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "gameType" INTEGER NOT NULL,
    "venue" TEXT NOT NULL,
    "neutralSite" BOOLEAN NOT NULL,
    "startTimeUTC" TIMESTAMP(3) NOT NULL,
    "easternUTCOffset" TEXT NOT NULL,
    "venueUTCOffset" TEXT NOT NULL,
    "venueTimezone" TEXT NOT NULL,
    "gameState" TEXT NOT NULL,
    "gameScheduleState" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);
