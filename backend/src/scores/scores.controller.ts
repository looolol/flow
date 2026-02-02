import { Controller, Get, Logger } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GameScoreDTO } from '@flow/shared';

@Controller('api/scores')
export class ScoresController {
  private readonly logger = new Logger(ScoresController.name);

  constructor(private readonly scoresService: ScoresService) {}

  @Get('schedule')
  async getSchedule(): Promise<GameScoreDTO[]> {
    this.logger.log('Fetching schedule...');

    return this.scoresService.getSchedule();
  }

  @Get('live')
  async getGameScores(): Promise<GameScoreDTO[]> {
    this.logger.log('Fetching live game updates...');

    return this.scoresService.getLiveScores();
  }
}
