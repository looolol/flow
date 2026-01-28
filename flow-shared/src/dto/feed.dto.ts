export const GAME_STATES = ['OFF', 'LIVE', 'FUT'] as const;

export type GameState = (typeof GAME_STATES)[number];

export function normalizeGameState(gameState: string): GameState {
  return GAME_STATES.includes(gameState as GameState)
    ? (gameState as GameState)
    : 'FUT';
}

export type FeedItemType =
  | ScoreFeedItemDTO;

export interface GameFeedItemDTO {
  id: string;
  type: 'score';
}

export interface ScoreFeedItemDTO extends GameFeedItemDTO {
  startTimeUTC: Date;
  homeTeamId: string;
  awayTeamId: string;
  gameState: GameState;
  gameScheduleState: string;
}

export interface GameFeedDTO {
  items: FeedItemType[];
}
