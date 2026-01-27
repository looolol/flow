import { Injectable } from '@nestjs/common';
import { GameRepository } from '../database/game.repository';
import { GameFeedDTO, GameFeedItemDTO } from './dto/feed.dto';
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

    const games: GameFeedItemDTO[] = await this.games.findGamesInDateRange(start, end);

    for (const game of games) {
      await this.gameState.logState(game.gameState);
    }

    return this.createFeed(games);
  }

  createFeed(games: GameFeedItemDTO[]): GameFeedDTO {
    const feed: GameFeedDTO = {
      live: [],
      upcoming: [],
      completed: [],
    };

    for (const game of games) {
      switch (game.gameState) {
        case 'LIVE':
          feed.live.push(game);
          break;

        case 'OFF':
          feed.completed.push(game);
          break;

        case 'FUT':
        default:
          feed.upcoming.push(game);
      }
    }

    return feed;
  }
}
