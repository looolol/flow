import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SystemStateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(key: string): Promise<string | null> {
    const state = await this.prisma.systemState.findUnique({ where: { key } });
    return state?.value ?? null;
  }

  async upsert(key: string, value: string): Promise<void> {
    await this.prisma.systemState.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
