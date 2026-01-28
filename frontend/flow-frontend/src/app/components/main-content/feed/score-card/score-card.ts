import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ScoreFeedItemDTO } from '@flow/shared';

@Component({
  selector: 'app-score-card',
  imports: [
    MatCardModule
  ],
  templateUrl: './score-card.html',
  styleUrl: './score-card.scss',
})
export class ScoreCard {
  @Input() data!: ScoreFeedItemDTO;

  get subtitle(): string {
    if (this.data.gameState == 'LIVE') {
      return 'Live Now';
    } else if (this.data.gameState === 'OFF' || this.data.gameState === 'FUT') {
      const gameDate = new Date(this.data.startTimeUTC);
      const gameDay = this.getGameDayStr(gameDate);
      const gameTime = this.getGameTimeStr(gameDate);

      return `${gameDay} • ${gameTime}`;
    } else {
      return 'Final';
    }
  }

  getGameDayStr(gameDate: Date): string {
    const now = new Date();

    // Clear time for date comparison
    const gameDay = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffDays = Math.floor((gameDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let dayText = '';
    if (diffDays === 0) {
      dayText = 'Today';
    } else if (diffDays === 1) {
      dayText = 'Tomorrow';
    } else if (diffDays === -1) {
      dayText = 'Yesterday';
    } else {
      dayText = gameDate.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      });
    }

    return dayText;
  }

  getGameTimeStr(gameDate: Date) {
    return gameDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

}
