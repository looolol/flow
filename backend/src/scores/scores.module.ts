import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { NhlApiModule } from '../nhl-api/nhl-api.module';
import { IngestionService } from '../ingestion/ingestion.service';

@Module({
  imports: [NhlApiModule],
  controllers: [ScoresController],
  providers: [ScoresService, IngestionService],
  exports: [],
})
export class ScoresModule {}
