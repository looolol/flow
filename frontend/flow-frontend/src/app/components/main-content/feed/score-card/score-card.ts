import { Component, computed, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameScoreDTO } from '@flow/shared';

@Component({
  selector: 'app-score-card',
  imports: [
    MatCardModule
  ],
  templateUrl: './score-card.html',
  styleUrl: './score-card.scss',
})
export class ScoreCard {
  data = input.required<GameScoreDTO>();

  statusLabel = computed(() => {
    const gameData = this.data();
    const date = new Date(gameData.game.startTimeUTC);

    const state = gameData.gameState;
    const period = gameData.period;
    const clock = gameData.clock;

    if (state === 'LIVE' || state === 'CRIT') {
      let periodStr = 'LIVE';

      if (period) {
        if (period <= 3) {
          periodStr = `P${period}`;;
        } else if (period === 4) {
          periodStr = 'OT';
        } else if (period >= 5) {
          periodStr = 'S/O';
        }
      }
      const clockStr = clock ? ` • ${clock}` : '';
      const prefix = state === 'CRIT' ? '🔥 ' : '';

      const finalClock= periodStr === 'S/O' ? '' : clockStr;

      return `${prefix}${periodStr}${finalClock}`;
    }

    const dayStr =  this.getGameDayStr(date);
    const timeStr = this.getGameTimeStr(date);

    if (state === 'FUT' || state === 'PRE') {
      return `${dayStr} • ${timeStr}`;
    }

    if (state === "OFF") {
      const suffix = period === 4 ? '/OT' : period && period >= 5 ? '/SO' : '';
      return `Final${suffix} • ${dayStr}`
    }

    return `${state} • ${dayStr}`
  });

  isWinning(team: 'home' | 'away'): boolean {
    const d = this.data();
    if (d.gameState === 'FUT' || d.gameState === 'PRE') return false;

    const home = d.homeScore ?? 0;
    const away = d.awayScore ?? 0;

    return team === 'home' ? home > away : away > home;
  }

  private getGameDayStr(gameDate: Date): string {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const gameDay = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());

    const diffDays = Math.floor((gameDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';

    return gameDate.toLocaleDateString(undefined, {
      month: 'numeric',
      day: 'numeric',
    });
  }

  private getGameTimeStr(gameDate: Date): string {
    return gameDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
