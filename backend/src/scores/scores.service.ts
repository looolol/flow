import { Injectable, Logger } from '@nestjs/common';
import { IngestionService } from '../ingestion/ingestion.service';
import { GameRepository } from '../database/game.repository';
import { TeamRepository } from '../database/team.repository';
import { GameScoreDTO } from '@flow/shared';
import { getDateRangeEnd, getDateRangeStart } from '../utils/date.helper';

@Injectable()
export class ScoresService {
  private readonly logger = new Logger(ScoresService.name);

  constructor(
    private readonly ingestionService: IngestionService,
    private readonly games: GameRepository,
    private readonly teams: TeamRepository,
  ) {}

  async getSchedule(): Promise<GameScoreDTO[]> {
    await this.ingestionService.syncScheduleIfNeeded();

    const start = getDateRangeStart();
    const end = getDateRangeEnd();

    return await this.games.findGamesInDateRange(start, end);
  }

  async getLiveScores(): Promise<GameScoreDTO[]> {
    await this.ingestionService.syncLiveScoresIfNeeded();

    return await this.games.findGamesToday();
  }
}
