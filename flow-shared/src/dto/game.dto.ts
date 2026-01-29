import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {TeamDTO} from "./team.dto";

export class VenueDTO {
  @IsString()
  default: string;
}

export class TVBroadcastDTO {
  @IsString()
  id: string;

  @IsString()
  market: string;

  @IsString()
  countryCode: string;

  @IsString()
  network: string;

  @IsNumber()
  sequenceNumber: number;
}

export class PeriodDTO {
  @IsNumber()
  number: number;

  @IsString()
  periodType: string;

  @IsNumber()
  maxRegulationPeriods: number;
}

export class GameOutcomeDTO {
  @IsString()
  lastPeriodType: string;
}

export class PlayerNameDTO {
  @IsString()
  default: string;
}

export class PlayerDTO {
  @IsString()
  playerId: string;

  @ValidateNested()
  @Type(() => PlayerNameDTO)
  firstInitial: PlayerNameDTO;

  @ValidateNested()
  @Type(() => PlayerNameDTO)
  lastName: PlayerNameDTO;
}

export class GameDTO {
  @IsString()
  id: string;

  @IsString()
  season: string;

  @IsNumber()
  gameType: number;

  @ValidateNested()
  @Type(() => VenueDTO)
  venue: VenueDTO;

  @IsBoolean()
  neutralSite: boolean;

  @IsDate()
  @Type(() => Date)
  startTimeUTC: Date;

  @IsString()
  easternUTCOffset: string;

  @IsString()
  venueUTCOffset: string;

  @IsString()
  venueTimezone: string;

  @IsString()
  gameState: string;

  @IsString()
  gameScheduleState: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TVBroadcastDTO)
  tvBroadcasts: TVBroadcastDTO[];

  @ValidateNested()
  @Type(() => TeamDTO)
  awayTeam: TeamDTO;

  @ValidateNested()
  @Type(() => TeamDTO)
  homeTeam: TeamDTO;

  @ValidateNested()
  @Type(() => PeriodDTO)
  periodDescriptor: PeriodDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GameOutcomeDTO)
  gameOutcome: GameOutcomeDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerDTO)
  winningGoalie: PlayerDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerDTO)
  winningGoalScorer: PlayerDTO;

  @IsOptional()
  @IsString()
  threeMinRecap: string;

  @IsOptional()
  @IsString()
  condensedGame: string;

  @IsString()
  gameCenterLink: string;

  @IsOptional()
  @IsString()
  ticketsLink: string;

  @IsOptional()
  @IsString()
  ticketsLinkFr: string;
}

export class DateDTO {
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  dayAbbrev: string;

  @IsNumber()
  numberOfGames: number;

  @IsArray()
  @IsOptional()
  datePromo: any[];

  @ValidateNested({ each: true })
  @Type(() => GameDTO)
  games: GameDTO[];
}

export class GameWeekDTO {
  @IsDate()
  @Type(() => Date)
  nextStartDate: Date;

  @IsDate()
  @Type(() => Date)
  previousStartDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DateDTO)
  gameWeek: DateDTO[];

  @IsDate()
  @Type(() => Date)
  preSeasonStartDate: Date;

  @IsDate()
  @Type(() => Date)
  regularSeasonStartDate: Date;

  @IsDate()
  @Type(() => Date)
  regularSeasonEndDate: Date;

  @IsDate()
  @Type(() => Date)
  playoffEndDate: Date;

  @IsNumber()
  numberOfGames: number;
}