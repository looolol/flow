import { Injectable, Logger } from '@nestjs/common';
import { NhlApiService } from '../nhl-api/nhl-api.service';
import { GameWeekDTO } from '../nhl-api/dto/game.dto';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(
    private readonly nhlApi: NhlApiService,
    private readonly prisma: PrimsaService;
  ) {}

  async getScoreWeek(): Promise<GameWeekDTO> {
    return this.nhlApi.getScheduleNow();
  }
}
