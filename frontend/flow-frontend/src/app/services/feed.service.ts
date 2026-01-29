import { inject, Injectable, signal } from '@angular/core';
import { GameFeedDTO } from '@flow/shared';
import { BackendService } from './backend.service';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private backendService = inject(BackendService);
  private syncService = inject(SyncService);

  private feedSignal = signal<GameFeedDTO | null>(null);
  public feed = this.feedSignal.asReadonly();

  private loadingSignal = signal<boolean>(false);
  public loading = this.loadingSignal.asReadonly();

  public errorSignal = signal<string | null>(null);
  public error = this.errorSignal.asReadonly();


  loadFeed() {
    this.loadingSignal.set(true);

    this.syncService.sync().subscribe({
      next: () => {
        this.backendService.getFeed().subscribe({
          next: (feed) => {
            this.feedSignal.set(feed)
            this.loadingSignal.set(false);
          },
          error: (err) => {
            this.errorSignal.set('Failed to load feed');
            this.loadingSignal.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Cold start failed', err);
        this.loadingSignal.set(false);
      }
    });
  }
}
