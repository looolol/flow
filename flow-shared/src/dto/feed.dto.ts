export const GAME_STATES = ['OFF', 'LIVE', 'FUT'] as const;

export type GameState = (typeof GAME_STATES)[number];

export function normalizeGameState(gameState: string): GameState {
  return GAME_STATES.includes(gameState as GameState)
    ? (gameState as GameState)
    : 'FUT';
}

export interface GameFeedItemDTO {
  id: string;
  startTimeUTC: Date;
  homeTeamId: string;
  awayTeamId: string;
  gameState: GameState;
  gameScheduleState: string;
}

export interface GameFeedDTO {
  live: GameFeedItemDTO[];
  upcoming: GameFeedItemDTO[];
  completed: GameFeedItemDTO[];
}
