import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GameDTO } from '../nhl-api/dto/game.dto';
import { GameFeedItemDTO, normalizeGameState } from '../feed/dto/feed.dto';
import { Game } from '@prisma/client';

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

  async findGamesInDateRange(
    start: Date,
    end: Date,
  ): Promise<GameFeedItemDTO[]> {
    const games = await this.prisma.game.findMany({
      where: {
        startTimeUTC: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { startTimeUTC: 'asc' },
    });

    return games.map((game) => this.mapToGameFeedItemDTO(game));
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

  private mapToGameFeedItemDTO(game: Game): GameFeedItemDTO {
    return {
      id: game.id,
      startTimeUTC: game.startTimeUTC,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      gameState: normalizeGameState(game.gameState),
      gameScheduleState: game.gameScheduleState,
    };
  }
}
