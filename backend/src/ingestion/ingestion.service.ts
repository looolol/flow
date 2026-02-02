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

  async syncScheduleIfNeeded(): Promise<boolean> {
    return this.runSync({
      key: 'lastScheduleFetch',
      freshness: this.SCHEDULE_FRESHNESS_MS,
      fetcher: () => this.nhlApi.getScheduleToday(),
      processor: async (schedule) => {
        for (const date of schedule.gameWeek) {
          for (const game of date.games) {
            await this.teams.upsertFromTeam(game.awayTeam);
            await this.teams.upsertFromTeam(game.homeTeam);
            await this.games.upsertFromGame(game);
          }
        }
      },
    });
  }

  // Placeholder for live score sync
  async syncLiveScoresIfNeeded(): Promise<boolean> {
    return this.runSync({
      key: 'lastLiveScoreFetch',
      freshness: this.LIVE_SCORE_FRESHNESS_MS,
      fetcher: () => this.nhlApi.getScoresNow(),
      processor: async (liveScores) => {
        for (const liveGame of liveScores.games) {
          await this.games.upsertFromLiveGame(liveGame);
        }
      },
    });
  }

  private async runSync<T>(options: {
    key: string;
    freshness: number;
    fetcher: () => Promise<T>;
    processor: (data: T) => Promise<void>;
  }): Promise<boolean> {
    const lastFetch = await this.systemState.get(options.key);

    if (!this.isFetchNeeded(lastFetch, options.freshness)) {
      this.logger.debug(`${options.key} is fresh, skipping.`);
      return false;
    }

    try {
      this.logger.log(`Syncing ${options.key}...`);
      const data = await options.fetcher();
      await options.processor(data);

      await this.systemState.upsert(options.key, new Date().toISOString());
      this.logger.log(`${options.key} sync complete.`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to sync ${options.key}: ${error}`);
      return false;
    }
  }

  private isFetchNeeded(lastFetch: string | null, freshness: number) {
    return !lastFetch || Date.now() - new Date(lastFetch).getTime() > freshness;
  }
}
