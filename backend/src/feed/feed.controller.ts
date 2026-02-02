import { Controller, Get, Logger, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FeedService } from './feed.service';
import { fromEvent, Observable, startWith, switchMap } from 'rxjs';
import { GameFeedDTO } from '@flow/shared';

@Controller('api/feed')
export class FeedController {
  private readonly logger = new Logger(FeedController.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly feedService: FeedService,
  ) {}

  @Get()
  async getFeed(): Promise<GameFeedDTO> {
    this.logger.log('Fetching current feed snapshot...');
    return await this.feedService.getFeed();
  }

  @Sse('stream')
  streamFeed(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'feed.update').pipe(
      startWith({ timestamp: new Date() }),
      switchMap(async () => {
        const feed = await this.feedService.getFeed();
        return { data: feed } as MessageEvent;
      }),
    );
  }
}
