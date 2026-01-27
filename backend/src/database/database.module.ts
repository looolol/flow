import { Module, OnModuleInit } from '@nestjs/common';
import client from './neon-client';

@Module({})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    await client.connect();
    console.log('Connected to Neon DB');
    console.log('db connection string: ', process.env.DATABASE_URL);
  }
}
