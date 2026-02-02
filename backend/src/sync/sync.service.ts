import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IngestionService } from '../ingestion/ingestion.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly ingestionService: IngestionService,
  ) {}

  async syncAll(): Promise<{ status: string }> {
    this.logger.log('Starting full ingestion sync...');

    await this.ingestionService.syncScheduleIfNeeded();
    const updated = await this.ingestionService.syncLiveScoresIfNeeded();

    if (updated) {
      this.eventEmitter.emit('feed.update', { timestamp: new Date() });
    }
    this.logger.log('Sync process completed.');

    return { status: 'success' };
  }
}
