import {IsBoolean, IsNumber, IsOptional, IsString, IsUrl, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class TeamNameDTO {
    @IsString()
    default: string;
}

export class TeamDTO {
    @IsString()
    id: string;

    @ValidateNested()
    @Type(() => TeamNameDTO)
    commonName: TeamNameDTO;

    @ValidateNested()
    @Type(() => TeamNameDTO)
    placeName: TeamNameDTO;

    @ValidateNested()
    @Type(() => TeamNameDTO)
    placeNameWithPreposition: TeamNameDTO;

    @IsString()
    abbrev: string;

    @IsUrl()
    logo: string;

    @IsUrl()
    darkLogo: string;

    @IsOptional()
    @IsBoolean()
    awaySplitSquad: boolean;

    @IsOptional()
    @IsBoolean()
    homeSplitSquad: boolean;

    @IsOptional()
    @IsNumber()
    score: number;
}

export interface TeamInfoDTO {
    id: string;
    name: string;
    place: string;
    abbrev: string;
    logo: string;
}