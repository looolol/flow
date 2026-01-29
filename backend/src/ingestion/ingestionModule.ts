import { Module } from '@nestjs/common';
import { NhlApiModule } from '../nhl-api/nhl-api.module';
import { GameRepository } from '../database/game.repository';
import { TeamRepository } from '../database/team.repository';
import { SystemStateRepository } from '../database/system-state.repository';
import { IngestionService } from './ingestion.service';

@Module({
  imports: [NhlApiModule],
  providers: [
    IngestionService,
    SystemStateRepository,
    GameRepository,
    TeamRepository,
  ],
  exports: [IngestionService],
})
export class IngestionModule {}
