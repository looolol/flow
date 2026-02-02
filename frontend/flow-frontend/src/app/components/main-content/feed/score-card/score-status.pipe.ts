import { Pipe, PipeTransform } from '@angular/core';
import { GameScoreDTO} from '@flow/shared';
import * as Utils from './score-utils';

@Pipe({
  name: 'scoreStatus',
  standalone: true,
  pure: false,
})
export class ScoreStatusPipe implements PipeTransform {
  transform(d: GameScoreDTO, tick?: number): string {
    const state = d.gameState;

    if (state === 'LIVE' || state === 'CRIT') {
      return this.getLiveStatus(d);
    }
    if (state === 'FUT' || state === 'PRE') {
      return this.getFutureStatus(d);
    }

    return this.getFinalStatus(d);
  }

  private getLiveStatus(d: GameScoreDTO): string {
    const pStr = Utils.getPeriodString(d.period);
    const intStr = d.inIntermission ? ' INT' : '';
    const prefix = d.gameState === 'CRIT' ? '🔥 ' : '';

    const isSO = pStr === 'S/O';
    const timeStr = isSO ? '' : ` • ${Utils.getSimulatedClock(d)}`;

    return `${prefix}${pStr}${intStr}${timeStr}`;
  }

  private getFutureStatus(d: GameScoreDTO): string {
    const date = new Date(d.game.startTimeUTC);
    return `${Utils.formatGameDay(date)} • ${Utils.formatGameTime(date)}`;
  }

  private getFinalStatus(d: GameScoreDTO): string {
    const date = new Date(d.game.startTimeUTC);
    const suffix = d.period === 4 ? '/OT' : (d.period && d.period >= 5) ? '/SO' : '';
    return `Final${suffix} • ${Utils.formatGameTime(date)}`;
  }
}
