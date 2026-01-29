import { inject, Injectable, signal } from '@angular/core';
import { BackendService } from './backend.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private backendService = inject(BackendService);

  private isSyncingSignal = signal(false);
  public isSyncing = this.isSyncingSignal.asReadonly();

  private errorSignal = signal<string | null>(null);
  public error = this.errorSignal.asReadonly();

  sync() {
    this.isSyncingSignal.set(true);
    this.errorSignal.set(null);

    return this.backendService.triggerSync().pipe(
      finalize(() => this.isSyncingSignal.set(false))
    );
  }
}
