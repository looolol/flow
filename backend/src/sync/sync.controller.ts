import { Controller, Get, Logger } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('api/sync')
export class SyncController {
  private readonly logger = new Logger(SyncController.name);

  constructor(private readonly syncService: SyncService) {}

  @Get()
  async triggerSync() {
    this.logger.log('Sync endpoint called');
    await this.syncService.syncAll();
    return { message: 'Sync triggered' };
  }
}
