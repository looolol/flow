import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { GameStateRepository } from './game-state.repository';
import { GameFeedDTO } from '@flow/shared';

@Controller('api/feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly gameState: GameStateRepository,
  ) {}

  @Get()
  getFeed(): Promise<GameFeedDTO> {
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
