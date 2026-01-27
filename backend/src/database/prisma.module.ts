import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DbController } from './db.controller';
import { GameRepository } from './game.repository';

@Global()
@Module({
  controllers: [DbController],
  providers: [PrismaService, GameRepository],
  exports: [PrismaService, GameRepository],
})
export class PrismaModule {}
