import { Injectable, Logger } from '@nestjs/common';
import { NhlApiService } from '../nhl-api/nhl-api.service';
import { GameWeekDTO } from '@flow/shared';
import { GameRepository } from '../database/game.repository';
import { TeamRepository } from '../database/team.repository';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(
    private readonly nhlApi: NhlApiService,
    private readonly games: GameRepository,
    private readonly teams: TeamRepository,
  ) {}

  async getScoreWeek(): Promise<GameWeekDTO> {
    this.logger.log('Fetching score week...');
    const schedule = await this.nhlApi.getScheduleToday();

    await Promise.all(
      schedule.gameWeek.map((date) =>
        Promise.all(
          date.games.map(async (game) => {
            await this.teams.upsertFromTeam(game.awayTeam);
            await this.teams.upsertFromTeam(game.homeTeam);
            await this.games.upsertFromNHL(game);
          }),
        ),
      ),
    );

    return schedule;
  }
}
