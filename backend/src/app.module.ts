import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvController } from './env/env.controller';
import { FeedModule } from './feed/feed.module';
import { ScoresModule } from './scores/scores.module';
import { PrismaModule } from './database/prisma.module';
import { NhlApiModule } from './nhl-api/nhl-api.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    PrismaModule,
    ScheduleModule.forRoot(),
    FeedModule,
    ScoresModule,
    NhlApiModule,
  ],
  controllers: [AppController, EnvController],
  providers: [AppService],
})
export class AppModule {}
