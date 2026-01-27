import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { NhlApiModule } from '../nhl-api/nhl-api.module';

@Module({
  imports: [NhlApiModule],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [],
})
export class ScoresModule {}
