import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  getMockFeed() {
    return [
      { id: 1, title: 'Feed item 1', content: 'Content for feed item 1' },
      { id: 2, title: 'Feed item 1', content: 'Content for feed item 2' },
    ];
  }

  async getFeed(): Promise<any[]> {
    return await new Promise((resolve) => this.getMockFeed());
  }
}
