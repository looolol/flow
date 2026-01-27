import { Injectable } from '@nestjs/common';
import { GameRepository } from '../database/game.repository';
import { FeedItemType, GameFeedDTO, ScoreFeedItemDTO } from '@flow/shared';
import { getDateRangeEnd, getDateRangeStart } from '../utils/date.helper';
import { GameStateRepository } from './game-state.repository';

@Injectable()
export class FeedService {
  constructor(
    private readonly games: GameRepository,
    private readonly gameState: GameStateRepository,
  ) {}

  getMockFeed() {
    return [
      { id: 1, title: 'Feed item 1', content: 'Content for feed item 1' },
      { id: 2, title: 'Feed item 1', content: 'Content for feed item 2' },
    ];
  }

  async getFeed(): Promise<GameFeedDTO> {
    const start = getDateRangeStart();
    const end = getDateRangeEnd();

    const scoreItems: ScoreFeedItemDTO[] = await this.games.findGamesInDateRange(start, end);

    const allItems: FeedItemType[] = [
      ...scoreItems,
    ];

    return this.createFeed(allItems);
  }

  createFeed(items: ScoreFeedItemDTO[]): GameFeedDTO {
    const feed: GameFeedDTO = {
      items: [],
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
