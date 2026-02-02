import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IngestionService } from '../ingestion/ingestion.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly ingestionService: IngestionService,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async handleScheduleCron() {
    this.logger.log('Running scheduled full schedule sync...');
    await this.ingestionService.syncScheduleIfNeeded();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleLiveUpdateCron() {
    this.logger.debug('Running scheduled live score sync...');

    const updated = await this.ingestionService.syncLiveScoresIfNeeded();

    if (updated) {
      this.logger.log('Scores changed! Emitting update to stream...');
      this.eventEmitter.emit('feed.update', { timestamp: new Date() });
    } else {
      this.logger.debug('No score changes detected.');
    }
  }

  async syncAll(): Promise<{ status: string }> {
    try {
      this.logger.log('Manual/Cold Start sync initiated...');

      await this.ingestionService.syncScheduleIfNeeded();
      const updated = await this.ingestionService.syncLiveScoresIfNeeded();

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
}
