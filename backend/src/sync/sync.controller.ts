import { Controller, Logger, Post } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('api/sync')
export class SyncController {
  private readonly logger = new Logger(SyncController.name);

  constructor(private readonly syncService: SyncService) {}

  @Post()
  async triggerSync() {
    this.logger.log('Sync endpoint called');
    return await this.syncService.syncAll();
  }
}
