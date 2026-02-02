/*
  Warnings:

  - You are about to drop the column `clock` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `isIntermission` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "clock",
DROP COLUMN "isIntermission",
ADD COLUMN     "clockRunning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inIntermission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "secondsRemaining" INTEGER;
