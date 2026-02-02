import { Component, computed, inject, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameScoreDTO } from '@flow/shared';
import { ClockService } from '../../../../services/clock.service';
import { ScoreStatusPipe } from './score-status.pipe';

@Component({
  selector: 'app-score-card',
  imports: [MatCardModule, ScoreStatusPipe],
  templateUrl: './score-card.html',
  styleUrl: './score-card.scss',
})
export class ScoreCard {
  data = input.required<GameScoreDTO>();
  private clock = inject(ClockService);

  home = computed(() => this.mapTeam('home'));
  away = computed(() => this.mapTeam('away'));

  protected tick = this.clock.tick;

  private mapTeam(type: 'home' | 'away') {
    const d = this.data();
    const isHome = type === 'home';
    const team = isHome ? d.game.homeTeam : d.game.awayTeam;
    const score = (isHome ? d.homeScore : d.awayScore) ?? 0;
    const sog = (isHome ? d.homeSOG : d.awaySOG) ?? 0;
    const oppScore = (isHome ? d.awayScore : d.homeScore) ?? 0;

    return {
      name: team.name,
      logo: team.logo,
      score,
      sog,
      isWinner: d.gameState === 'OFF' && score > oppScore,
    };
  }
}
