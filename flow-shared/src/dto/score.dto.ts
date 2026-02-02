import {
    IsArray, IsBoolean,
    IsDate, IsNumber, IsOptional,
    IsString, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {PlayerNameDTO, VenueDTO} from "./game.dto";

export class ClockDTO {
    @IsString()
    timeRemaining: string;

    @IsString()
    secondsRemaining: string;

    @IsBoolean()
    running: boolean;

    @IsBoolean()
    inIntermission: boolean;
}

export class TeamLeaderDTO {
    @IsString()
    id: string;

    @ValidateNested()
    @Type(() => PlayerNameDTO)
    firstName: string;

    @ValidateNested()
    @Type(() => PlayerNameDTO)
    lastName: string;

    @IsString()
    headshot: string;

    @IsString()
    teamAbbrev: string;

    @IsString()
    sweaterNumber: string;

    @IsString()
    position: string;
}

export class TeamLiveDTO {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsNumber()
    sog?: number;

    @IsOptional()
    @IsString()
    record?: string;

    @IsString()
    logo: string;

    @IsString()
    abbrev: string;
}

export class LiveGameDTO {
    @IsString()
    id: string;

    @IsString()
    season: string;

    @IsNumber()
    gameType: number;

    @IsString()
    gameState: string;

    @IsDate()
    @Type(() => Date)
    startTimeUTC: Date;

    @ValidateNested()
    @Type(() => VenueDTO)
    venue: VenueDTO

    @IsBoolean()
    neutralSite: boolean;

    @ValidateNested()
    @Type(() => TeamLiveDTO)
    homeTeam: TeamLiveDTO;

    @ValidateNested()
    @Type(() => TeamLiveDTO)
    awayTeam: TeamLiveDTO;

    @IsOptional()
    @ValidateNested()
    @Type(() => ClockDTO)
    clock?: ClockDTO;

    @IsOptional()
    @IsNumber()
    period?: number;

    @IsOptional()
    @IsArray()
    goals?: any[];  // expand this once we build the goal table

    @IsString()
    gameCenterLink?: string;

    @IsOptional()
    ticketsLink?: string;

    @ValidateNested({ each: true })
    @Type(() => TeamLeaderDTO)
    teamLeaders?: string[];
}

export class GameCountDTO {
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    dayAbbrev: string;

    @IsNumber()
    numberOfGames: number;
}

export class LiveScoresDTO {
    @IsDate()
    @Type(() => Date)
    prevDate: Date;

    @IsDate()
    @Type(() => Date)
    currentDate: Date;

    @IsDate()
    @Type(() => Date)
    nextDate: Date;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => GameCountDTO)
    gameWeek: GameCountDTO[];


    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => LiveGameDTO)
    games: LiveGameDTO[];
}