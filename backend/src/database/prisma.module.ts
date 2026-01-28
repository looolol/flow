import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DbController } from './db.controller';
import { GameRepository } from './game.repository';
import { GameStateRepository } from '../feed/game-state.repository';

@Global()
@Module({
  controllers: [DbController],
  providers: [PrismaService, GameRepository, GameStateRepository],
  exports: [PrismaService, GameRepository],
})
export class PrismaModule {}
