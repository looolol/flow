import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed() {
    return this.feedService.getFeed();
  }

  @Get('mock')
  getMockFeed() {
    return this.feedService.getMockFeed();
  }
}
