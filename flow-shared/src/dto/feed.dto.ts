import {TeamInfoDTO} from "./team.dto";

export type FeedItemType =
  | 'score'

export type FeedItemDTO =
  | GameScoreDTO;

export interface FeedItemBaseDTO {
  id: string;
  type: FeedItemType;
  createdAt: Date;
  updatedAt: Date;
  priority?: number;
}

export interface GameContextDTO {
  gameId: string;
  startTimeUTC: Date;
  awayTeam: TeamInfoDTO;
  homeTeam: TeamInfoDTO;
}

export interface GameScoreDTO extends FeedItemBaseDTO {
  type: 'score';
  game: GameContextDTO;

  gameState: string;

  awayScore?: number;
  homeScore?: number;

  awaySOG?: number;
  homeSOG?: number;

  period?: number;
  secondsRemaining?: number;
  clockRunning?: boolean;
  inIntermission?: boolean;
}

export interface GameFeedDTO {
  items: FeedItemDTO[];
  generatedAt: Date;
}