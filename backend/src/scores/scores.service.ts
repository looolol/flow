import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoresService {
  async getTodayScores() {
    const response = { data: null };
    return response.data;
  }
}
