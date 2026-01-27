import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('api/env')
export class EnvController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getEnvironment() {
    return {
      environment: this.configService.get<string>('APP_ENV'),
      cors_origins: this.configService.get<string>('CORS_ORIGINS'),
    };
  }
}
