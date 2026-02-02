import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { GameWeekDTO, LiveScoresDTO } from '@flow/shared';
import { getToday } from '../utils/date.helper';

@Injectable()
export class NhlApiService {
  private readonly logger = new Logger(NhlApiService.name);
  private readonly baseUrl = process.env.NHL_API_URL;

  async getScheduleToday(): Promise<GameWeekDTO> {
    const url = `${this.baseUrl}schedule/${getToday()}`;
    return this.fetchAndValidate(url, GameWeekDTO);
  }

  async getScoresNow(): Promise<LiveScoresDTO> {
    const url = `${this.baseUrl}score/now`;
    return this.fetchAndValidate(url, LiveScoresDTO);
  }

  private async fetchAndValidate<T>(url: string, dtoClass: any): Promise<T> {
    try {
      this.logger.log(`Fetching ${url}`);

      const response = await axios.get(url);

      const instance = plainToInstance(dtoClass, response.data, {
        enableImplicitConversion: true,
        // excludeExtraneousValues: true,
      });

      await validateOrReject(instance);

      return instance as T;
    } catch (error) {
      this.logger.error(`NHL API ERROR [${url}]: ${error}`);
      throw error;
    }
  }
}
