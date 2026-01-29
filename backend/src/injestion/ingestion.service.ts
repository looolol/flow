import { Injectable, Logger } from '@nestjs/common';
import { SystemStateRepository } from '../database/system-state.repository';
import { GameRepository } from '../database/game.repository';
import { TeamRepository } from '../database/team.repository';
import { NhlApiService } from '../nhl-api/nhl-api.service';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  private readonly SCHEDULE_FRESHNESS_MS = 12 * 60 * 60 * 1000; // 12 hours
  private readonly LIVE_SCORE_FRESHNESS_MS = 1 * 60 * 1000; // 1 minutes

  constructor(
    private readonly systemState: SystemStateRepository,
    private readonly games: GameRepository,
    private readonly teams: TeamRepository,
    private readonly nhlApi: NhlApiService,
  ) {}

  async syncScheduleIfNeeded() {
    const lastFetch = await this.systemState.get('lastScheduleFetch');

    if (this.isFetchNeeded(lastFetch, this.SCHEDULE_FRESHNESS_MS)) {
      this.logger.log('Schedule stale or missing, fetching new schedule...');
      const schedule = await this.nhlApi.getScheduleToday();

      for (const date of schedule.gameWeek) {
        for (const game of date.games) {
          await this.teams.upsertFromTeam(game.awayTeam);
          await this.teams.upsertFromTeam(game.homeTeam);
          await this.games.upsertFromGame(game);
        }
      }

      await this.systemState.upsert(
        'lastScheduleFetch',
        new Date().toISOString(),
      );
      this.logger.log('Schedule sync complete');
    } else {
      this.logger.log('Schedule is fresh, skipping fetch.');
    }
  }

  // Placeholder for live score sync
  async syncLiveScoresIfNeeded() {}

  async syncAll() {
    await this.syncScheduleIfNeeded();
    await this.syncLiveScoresIfNeeded();
  }

  isFetchNeeded(lastFetch: string | null, freshness: number) {
    return !lastFetch || Date.now() - new Date(lastFetch).getTime() > freshness;
  }
}
