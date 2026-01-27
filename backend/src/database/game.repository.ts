import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GameDTO } from '../nhl-api/dto/game.dto';

@Injectable()
export class GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromNHL(game: GameDTO) {
    return this.prisma.game.upsert({
      where: { id: game.id },
      update: this.mapGame(game),
      create: {
        id: game.id,
        ...this.mapGame(game),
      },
    });
  }

  private mapGame(game: GameDTO) {
    return {
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
    }
  }
}