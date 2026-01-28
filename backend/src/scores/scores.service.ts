import { Injectable, Logger } from '@nestjs/common';
import { NhlApiService } from '../nhl-api/nhl-api.service';
import { GameWeekDTO } from '@flow/shared';
import { GameRepository } from '../database/game.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(
    private readonly nhlApi: NhlApiService,
    private readonly games: GameRepository,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.log('Fetching updated scores...');
    try {
      await this.getScoreWeek();
    } catch (error) {
      this.logger.error('Error fetching scores...', error);
    }
  }

  async getScoreWeek(): Promise<GameWeekDTO> {
    const schedule = await this.nhlApi.getScheduleToday();

    for (const date of schedule.gameWeek) {
      await Promise.all(
        date.games.map((game) => this.games.upsertFromNHL(game)),
      );
    }

    return schedule;
  }
}
