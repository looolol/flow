import { Controller, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GameWeekDTO } from '../nhl-api/dto/game.dto';

@Controller('api/scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('week')
  async getScoreWeek(): Promise<GameWeekDTO> {
    return this.scoresService.getScoreWeek();
  }
}