/*
  Warnings:

  - You are about to drop the column `easternUTCOffset` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `gameScheduleState` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `venueTimezone` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `venueUTCOffset` on the `games` table. All the data in the column will be lost.
  - You are about to drop the `GameStateLog` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `gameState` on the `games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('OFF', 'PRE', 'LIVE', 'FUT');

-- AlterTable
ALTER TABLE "games" DROP COLUMN "easternUTCOffset",
DROP COLUMN "gameScheduleState",
DROP COLUMN "venueTimezone",
DROP COLUMN "venueUTCOffset",
ADD COLUMN     "awayTeamScore" INTEGER,
ADD COLUMN     "homeTeamScore" INTEGER,
DROP COLUMN "gameState",
ADD COLUMN     "gameState" "GameState" NOT NULL;

-- DropTable
DROP TABLE "GameStateLog";

-- CreateTable
CREATE TABLE "system" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbrev" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_key_key" ON "system"("key");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
