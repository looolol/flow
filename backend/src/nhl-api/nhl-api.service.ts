import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { GameWeekDTO } from './dto/game.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class NhlApiService {
  private readonly logger = new Logger(NhlApiService.name);
  private readonly baseUrl = process.env.NHL_API_URL;

  async getScheduleNow(): Promise<GameWeekDTO> {
    try {
      const url = `${this.baseUrl}schedule/now`;
      this.logger.log(`Fetching ${url}`);

      const response = await axios.get(url);

      const dto = plainToInstance(GameWeekDTO, response.data, { enableImplicitConversion: true });
      await validateOrReject(dto);

      return dto;
    } catch (error) {
      this.logger.error('Failed to fetch schedule now', error);
      throw error;
    }
  }

  async getScoresNow(): Promise<any> {
    try {
      const url = `${this.baseUrl}score/now`;
      this.logger.log(`Fetching ${url}`);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch score now', error);
      throw error;
    }
  }
}
