import { Controller, Get, Logger } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GameWeekDTO } from '@flow/shared';

@Controller('api/scores')
export class ScoresController {
  private readonly logger = new Logger(ScoresController.name);

  constructor(private readonly scoresService: ScoresService) {}

  @Get('week')
  async getScoreWeek(): Promise<GameWeekDTO> {
    this.logger.log('Getting score week');
    return this.scoresService.getScoreWeek();
  }
}
