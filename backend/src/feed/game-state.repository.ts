import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class GameStateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async logState(state: string): Promise<void> {
    try {
      await this.prisma.gameStateLog.upsert({
        where: { state },
        update: {},
        create: { state },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllStates(): Promise<string[]> {
    const records = await this.prisma.gameStateLog.findMany({
      orderBy: { firstSeen: 'asc' },
    });
    return records.map((r) => r.state);
  }
}
