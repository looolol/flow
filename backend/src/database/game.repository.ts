import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GameDTO, normalizeGameState, ScoreFeedItemDTO } from '@flow/shared';
import { Game } from '@prisma/client';
import { GameStateRepository } from '../feed/game-state.repository';

type GameCreateInput = Omit<Game, 'createdAt' | 'updatedAt'>;

@Injectable()
export class GameRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gameState: GameStateRepository,
  ) {}

  async upsertFromNHL(game: GameDTO) {
    await this.gameState.logState(game.gameState);

    return this.prisma.game.upsert({
      where: { id: game.id },
      update: this.mapToGame(game),
      create: this.mapToGame(game),
    });
  }

  async findGamesInDateRange(
    start: Date,
    end: Date,
  ): Promise<ScoreFeedItemDTO[]> {
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
      neutralSite: game.neutralSite,
      startTimeUTC: game.startTimeUTC,
      easternUTCOffset: game.easternUTCOffset,
      venueUTCOffset: game.venueUTCOffset,
      venueTimezone: game.venueTimezone,
      gameState: game.gameState,
      gameScheduleState: game.gameScheduleState,
      awayTeamId: game.awayTeam.id,
      homeTeamId: game.homeTeam.id,
    };
  }

  private mapToScoreFeedItemDTO(game: Game): ScoreFeedItemDTO {
    return {
      id: game.id,
      type: 'score',
      startTimeUTC: game.startTimeUTC,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      gameState: normalizeGameState(game.gameState),
      gameScheduleState: game.gameScheduleState,
    };
  }
}
