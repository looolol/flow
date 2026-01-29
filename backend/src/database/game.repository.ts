import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GameDTO, GameScoreDTO } from '@flow/shared';
import { Game, GameState } from '@prisma/client';

type GameCreateInput = Omit<Game, 'createdAt' | 'updatedAt'>;

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromNHL(game: GameDTO) {
    return this.prisma.game.upsert({
      where: { id: game.id },
      update: this.mapToGame(game),
      create: this.mapToGame(game),
    });
  }

  async findGamesInDateRange(start: Date, end: Date): Promise<GameScoreDTO[]> {
    const games = await this.prisma.game.findMany({
      where: {
        startTimeUTC: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { startTimeUTC: 'asc' },
    });

    return games.map((game) => this.mapToScoreFeedItemDTO(game));
  }

  private mapToGame(game: GameDTO): GameCreateInput {
    return {
      id: game.id,
      season: game.season,
      gameType: game.gameType,
      venue: game.venue.default,
      startTimeUTC: game.startTimeUTC,
      gameState: this.normalizeGameState(game.gameState),
      awayTeamId: game.awayTeam.id,
      awayTeamScore: game.awayTeam.score,
      homeTeamId: game.homeTeam.id,
      homeTeamScore: game.homeTeam.score,
    };
  }

  private mapToScoreFeedItemDTO(game: Game): GameScoreDTO {
    return {
      id: game.id,
      type: 'score',
      game: {
        gameId: game.id,
        startTimeUTC: game.startTimeUTC,
        awayTeamId: game.awayTeamId,
        homeTeamId: game.homeTeamId,
      },
      gameState: game.gameState,
      awayScore: game.awayTeamScore ?? undefined,
      homeScore: game.homeTeamScore ?? undefined,
      createdAt: game.createdAt,
    };
  }

  normalizeGameState(rawState: string): GameState {
    const key = rawState.toUpperCase() as keyof typeof GameState;
    return GameState[key] ?? GameState.OFF;
  }
}
