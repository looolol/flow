import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DbController } from './db.controller';
import { GameRepository } from './game.repository';
import { TeamRepository } from './team.repository';

@Global()
@Module({
  controllers: [DbController],
  providers: [PrismaService, GameRepository, TeamRepository],
  exports: [PrismaService, GameRepository, TeamRepository],
})
export class PrismaModule {}
