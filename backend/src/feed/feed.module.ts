import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { GameStateRepository } from './game-state.repository';

@Module({
  controllers: [FeedController],
  providers: [FeedService, GameStateRepository],
  exports: [],
})
export class FeedModule {}
