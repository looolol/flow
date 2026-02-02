import { GameScoreDTO } from '@flow/shared';

export function getPeriodString(period: number | undefined): string {
  if (!period) return 'LIVE';
  if (period <= 3) return `P${period}`;
  if (period === 4) return 'OT';
  return 'S/O';
}

export function getSimulatedClock(d: GameScoreDTO): string {
  let seconds = d.secondsRemaining ?? 0;

  if (d.clockRunning && seconds > 0) {
    const drift = Math.floor((Date.now() - new Date(d.updatedAt).getTime()) / 1000);
    seconds = Math.max(0, seconds - drift);
  }

  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`
}

export function formatGameTime(gameDate: Date): string {
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

export function formatGameDay(gameDate: Date): string {
  return gameDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}
