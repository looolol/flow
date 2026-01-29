import { Injectable, Logger } from '@nestjs/common';
import { IngestionService } from '../ingestion/ingestion.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(private readonly ingestionService: IngestionService) {}

  async syncAll(): Promise<{ status: string }> {
    this.logger.log('Starting full ingestion sync...');
    await this.ingestionService.syncScheduleIfNeeded();
    await this.ingestionService.syncLiveScoresIfNeeded();
    this.logger.log('Sync process completed.');

    return { status: 'success' };
  }
}
