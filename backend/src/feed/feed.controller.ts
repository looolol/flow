import { Controller, Get, Logger } from '@nestjs/common';
import { FeedService } from './feed.service';
import { GameFeedDTO } from '@flow/shared';

@Controller('api/feed')
export class FeedController {
  private readonly logger = new Logger(FeedController.name);

  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(): Promise<GameFeedDTO> {
    this.logger.log('Getting feed');
    return this.feedService.getFeed();
  }
}
