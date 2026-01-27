import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  getFeed() {
    return [
      { id: 1, title: 'Feed item 1', content: 'Content for feed item 1' },
      { id: 2, title: 'Feed item 1', content: 'Content for feed item 2' },
    ];
  }
}
