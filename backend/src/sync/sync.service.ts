import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IngestionService } from '../ingestion/ingestion.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameRepository } from '../database/game.repository';

@Injectable()
export class SyncService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SyncService.name);
  private nextSyncTimeout: NodeJS.Timeout | null = null;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly game: GameRepository,
    private readonly ingestionService: IngestionService,
  ) {}

  async onModuleInit() {
    await this.handleScheduleCron();
    void this.runSyncLoop();
  }

  onModuleDestroy() {
    if (this.nextSyncTimeout) clearTimeout(this.nextSyncTimeout);
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async handleScheduleCron() {
    this.logger.log('Running scheduled full schedule sync...');
    await this.ingestionService.syncScheduleIfNeeded();
  }

  private async runSyncLoop() {
    this.logger.debug('Initiating adaptive sync check...');

    try {
      const updated = await this.ingestionService.syncLiveScoresIfNeeded();
      if (updated) {
        this.eventEmitter.emit('feed.update', { timestamp: new Date() });
      }

      const delay = await this.calculateDelay();

      this.logger.debug(`Next sync scheduled in ${delay / 1000}s`);
      this.nextSyncTimeout = setTimeout(() => {
        void this.runSyncLoop();
      }, delay);
    } catch (err) {
      this.logger.error('Sync loop failed, retrying in 60s', err);
      this.nextSyncTimeout = setTimeout(() => {
        void this.runSyncLoop();
      }, 60 * 1000);
    }
  }

  async syncAll(): Promise<{ status: string }> {
    try {
      this.logger.log('Manual/Cold Start sync initiated...');

      await this.ingestionService.syncScheduleIfNeeded(true);
      const updated = await this.ingestionService.syncLiveScoresIfNeeded(true);

      if (updated) {
        this.eventEmitter.emit('feed.update', {
          source: 'manual-sync',
          timestamp: new Date(),
        });
      }

      this.logger.log('Sync process completed.');
      return { status: 'success' };
    } catch (error) {
      this.logger.error(`Sync process failed: ${error}`);
      return { status: 'error' };
    }
  }

  private async calculateDelay(): Promise<number> {
    const isCritical = await this.game.hasCriticalGames();
    if (isCritical) return 15 * 1000;

    const active = await this.game.hasActiveGames();
    if (active) return 30 * 1000;

    const nextStart = await this.game.getNextGameStartTime();
    if (nextStart) {
      const msUntilStart = nextStart.getTime() - Date.now();

      if (msUntilStart < 0) return 30 * 1000;
      if (msUntilStart < 15 * 60 * 1000) return 60 * 1000;
      if (msUntilStart < 60 * 60 * 1000) return 5 * 60 * 1000;

      return Math.min(msUntilStart, 60 * 60 * 1000);
    }

    return 60 * 60 * 1000;
  }
}
