import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GameDTO, GameScoreDTO, LiveGameDTO } from '@flow/shared';
import { Game, GameState, Team } from '@prisma/client';

type GameCreateInput = Omit<Game, 'createdAt' | 'updatedAt'>;
type GameLiveUpdateInput = Pick<
  Game,
  | 'awayTeamScore'
  | 'homeTeamScore'
  | 'awayTeamSOG'
  | 'homeTeamSOG'
  | 'gameState'
  | 'period'
  | 'secondsRemaining'
  | 'clockRunning'
  | 'inIntermission'
>;
type GameWithTeam = Game & {
  awayTeam: Team;
  homeTeam: Team;
};

@Injectable()
export class GameRepository {
  private readonly logger = new Logger(GameRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async upsertFromGame(game: GameDTO) {
    return this.prisma.game.upsert({
      where: { id: game.id },
      update: this.mapToGame(game),
      create: this.mapToGame(game),
    });
  }

  async upsertFromLiveGame(liveGame: LiveGameDTO) {
    try {
      return await this.prisma.game.update({
        where: { id: liveGame.id },
        data: this.mapFromLiveUpdate(liveGame),
      });
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(
          `CRITICAL: Attempted to update live score for non-existent game ID: ${liveGame.id}.  Schedule sync may have failed.`,
        );
      }
      throw error;
    }
  }

  async findGamesInDateRange(start: Date, end: Date): Promise<GameScoreDTO[]> {
    const games: GameWithTeam[] = await this.prisma.game.findMany({
      where: {
        startTimeUTC: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { startTimeUTC: 'asc' },
      include: {
        awayTeam: true,
        homeTeam: true,
      },
    });

    return games.map((game) => this.mapToScoreFeedItemDTO(game));
  }

  async findGamesToday(): Promise<GameScoreDTO[]> {
    const now = new Date();
    const start = new Date(now);

    // Want to get games from noon ETC till noon tomorrow
    const dayStartTime = 12;
    if (now.getUTCHours() < dayStartTime) {
      start.setUTCDate(now.getUTCDate() - 1);
    }
    start.setUTCHours(dayStartTime, 0, 0, 0);

    // The "End of Day" is exactly 24 hours later
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    this.logger.debug(
      `Scoreboard Window: ${start.toISOString()} to ${end.toISOString()}`,
    );

    return this.findGamesInDateRange(start, end);
  }

  private mapToGame(game: GameDTO): GameCreateInput {
    return {
      id: game.id,
      season: game.season,
      gameType: game.gameType,
      venue: game.venue.default,
      startTimeUTC: game.startTimeUTC,
      gameState: this.normalizeGameState(game.gameState),
      awayTeamId: game.awayTeam.id,
      awayTeamScore: game.awayTeam.score,
      awayTeamSOG: null,
      homeTeamId: game.homeTeam.id,
      homeTeamScore: game.homeTeam.score,
      homeTeamSOG: null,
      period: null,
      secondsRemaining: null,
      clockRunning: false,
      inIntermission: false,
    };
  }

  private mapFromLiveUpdate(liveGame: LiveGameDTO): GameLiveUpdateInput {
    return {
      awayTeamScore: liveGame.awayTeam.score ?? 0,
      homeTeamScore: liveGame.homeTeam.score ?? 0,
      awayTeamSOG: liveGame.awayTeam.sog ?? 0,
      homeTeamSOG: liveGame.homeTeam.sog ?? 0,
      gameState: this.normalizeGameState(liveGame.gameState),
      period: liveGame.period ?? null,
      secondsRemaining: liveGame.clock?.secondsRemaining ?? null,
      clockRunning: liveGame.clock?.running ?? false,
      inIntermission: liveGame.clock?.inIntermission ?? false,
    };
  }

  private mapToScoreFeedItemDTO(game: GameWithTeam): GameScoreDTO {
    return {
      id: game.id,
      type: 'score',
      game: {
        gameId: game.id,
        startTimeUTC: game.startTimeUTC,
        awayTeam: game.awayTeam,
        homeTeam: game.homeTeam,
      },
      gameState: game.gameState,
      awayScore: game.awayTeamScore ?? 0,
      homeScore: game.homeTeamScore ?? 0,
      awaySOG: game.awayTeamSOG ?? 0,
      homeSOG: game.homeTeamSOG ?? 0,
      period: game.period ?? undefined,
      secondsRemaining: game.secondsRemaining ?? undefined,
      inIntermission: game.inIntermission,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }

  normalizeGameState(rawState: string): GameState {
    const key = rawState.toUpperCase() as keyof typeof GameState;
    return GameState[key] ?? GameState.OFF;
  }
}
