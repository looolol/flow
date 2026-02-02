-- AlterEnum
ALTER TYPE "GameState" ADD VALUE 'CRIT';

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "clock" TEXT,
ADD COLUMN     "period" INTEGER;
