import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('api/db')
export class DbController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async dbHealth() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok' };
  }
}
