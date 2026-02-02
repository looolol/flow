import { computed, inject, Injectable, signal } from '@angular/core';
import { GameFeedDTO } from '@flow/shared';
import { BackendService } from './backend.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

export type FeedStatus = 'IDLE' | 'SYNCING' | 'FETCHING' | 'ERROR';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private backend = inject(BackendService);

  private statusSignal = signal<FeedStatus>('IDLE');
  public status = this.statusSignal.asReadonly();

  private errorSignal = signal<string | null>(null);
  public error = this.errorSignal.asReadonly();

  private initialFeed = signal<GameFeedDTO | null>(null);
  private liveFeed  = toSignal(
    this.backend.getFeedStream().pipe(
      catchError((err) => {
        console.error('SSE Stream error:', err);
        return of(null);
      }),
    )
  );
  public feed = computed(() => this.liveFeed() ?? this.initialFeed());

  public load(force = false) {
    if (this.initialFeed() && !force) {
      console.log('skipping feed...');
      return;
    }

    this.statusSignal.set('SYNCING');
    this.errorSignal.set(null);

    this.backend.triggerSyncAndGetFeed().pipe(
      tap(() => this.statusSignal.set('FETCHING')),
      switchMap(() => this.backend.getFeed()),
      finalize(() => {
        if (this.statusSignal() !== 'ERROR') this.statusSignal.set('IDLE');
      })
    ).subscribe({
      next: (data) => {
        this.initialFeed.set(data);
      },
      error: (err) => {
        this.statusSignal.set('ERROR');
        this.errorSignal.set('Failed to initialize feed');
      }
    })
  }
}
