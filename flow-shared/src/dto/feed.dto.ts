export type FeedItemType =
  | 'score'

export type FeedItemDTO =
  | GameScoreDTO;

export interface FeedItemBaseDTO {
  id: string;
  type: FeedItemType;
  createdAt: Date;
  priority?: number;
}

export interface GameContextDTO {
  gameId: string;
  startTimeUTC: Date;
  awayTeamId: string;
  homeTeamId: string;
}

export interface GameScoreDTO extends FeedItemBaseDTO {
  type: 'score';

  game: GameContextDTO;

  gameState: string;
  homeScore?: number;
  awayScore?: number;
}

export interface GameFeedDTO {
  items: FeedItemDTO[];
  generatedAt: Date;
}