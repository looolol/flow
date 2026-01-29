import { Controller, Get, Logger } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { GameScoreDTO } from '@flow/shared';

@Controller('api/scores')
export class ScoresController {
  private readonly logger = new Logger(ScoresController.name);

  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  async getGameScores(): Promise<GameScoreDTO[]> {
    this.logger.log('Fetching game scores for feed...');

    return this.scoresService.getGameScores();
  }
}
