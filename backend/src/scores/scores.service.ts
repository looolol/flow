import { Injectable, Logger } from '@nestjs/common';
import { NhlApiService } from '../nhl-api/nhl-api.service';
import { GameDTO, GameWeekDTO } from '../nhl-api/dto/game.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(
    private readonly nhlApi: NhlApiService,
    private readonly prisma: PrismaService,
  ) {}

  async getScoreWeek(): Promise<GameWeekDTO> {
    const schedule = await this.nhlApi.getScheduleNow();

    for (const date of schedule.gameWeek) {
      for (const game of date.games) {
        await this.upsertGame(game);
      }
    }

    return schedule;
  }

  private async upsertGame(game: GameDTO) {
    await this.prisma.game.upsert({
      where: { id: game.id },
      update: {
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
      },
      create: {
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
      },
    });
  }
}
