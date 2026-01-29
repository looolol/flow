import { Injectable } from '@nestjs/common';
import { GameRepository } from '../database/game.repository';
import { FeedItemDTO, GameFeedDTO, GameScoreDTO } from '@flow/shared';
import { getDateRangeEnd, getDateRangeStart } from '../utils/date.helper';

@Injectable()
export class FeedService {
  constructor(private readonly games: GameRepository) {}

  async getFeed(): Promise<GameFeedDTO> {
    const start = getDateRangeStart();
    const end = getDateRangeEnd();

    const scoreItems: GameScoreDTO[] = await this.games.findGamesInDateRange(start, end);

    const allItems: FeedItemDTO[] = [
      ...scoreItems,
    ];

    return this.createFeed(allItems);
  }

  createFeed(items: FeedItemDTO[]): GameFeedDTO {
    const feed: GameFeedDTO = {
      items: [],
      generatedAt: new Date(),
    };

    /**
     * Here is where to generate feed, can sort by importance, etc.
     */

    for (const item of items) {
      feed.items.push(item);
    }

    return feed;
  }
}
