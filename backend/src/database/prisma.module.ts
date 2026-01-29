import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DbController } from './db.controller';
import { GameRepository } from './game.repository';
import { TeamRepository } from './team.repository';
import { SystemStateRepository } from './system-state.repository';

@Global()
@Module({
  controllers: [DbController],
  providers: [
    PrismaService,
    SystemStateRepository,
    GameRepository,
    TeamRepository,
  ],
  exports: [
    PrismaService,
    SystemStateRepository,
    GameRepository,
    TeamRepository,
  ],
})
export class PrismaModule {}
