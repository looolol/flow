import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { GameStateRepository } from './game-state.repository';

@Controller('api/feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly gameState: GameStateRepository,
  ) {}

  @Get()
  async getFeed() {
    return this.feedService.getFeed();
  }

  @Get('mock')
  getMockFeed() {
    return this.feedService.getMockFeed();
  }

  @Get('gameState')
  async getGameState(): Promise<string[]> {
    return this.gameState.getAllStates();
  }
}
