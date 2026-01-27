import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvController } from './env/env.controller';
import { FeedModule } from './feed/feed.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    FeedModule,
    ScoresModule,
  ],
  controllers: [AppController, EnvController],
  providers: [AppService],
})
export class AppModule {}
