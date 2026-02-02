-- AlterTable
ALTER TABLE "games" ADD COLUMN     "awayTeamSOG" INTEGER,
ADD COLUMN     "homeTeamSOG" INTEGER,
ADD COLUMN     "isIntermission" BOOLEAN NOT NULL DEFAULT false;
