import { Injectable } from '@nestjs/common';
import client from '../database/neon-client';

@Injectable()
export class FeedService {
  getMockFeed() {
    return [
      { id: 1, title: 'Feed item 1', content: 'Content for feed item 1' },
      { id: 2, title: 'Feed item 1', content: 'Content for feed item 2' },
    ];
  }

  async getFeed(): Promise<any[]> {
    const res = await client.query(
      'SELECT * FROM games ORDER BY game_date DESC',
    );
    return res.rows;
  }
}
