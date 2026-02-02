import { inject, Injectable, NgZone } from '@angular/core';
import { GameFeedDTO } from '@flow/shared';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private ngZone = inject(NgZone);
  private http = inject(HttpClient);

  private readonly apiUrl = environment.BACKEND_URL;

  triggerSyncAndGetFeed(): Observable<GameFeedDTO> {
    return this.http.post<{status: string}>(`${this.apiUrl}/api/sync`, {}).pipe(
      switchMap(() => this.getFeed())
    );
  }

  getFeed(): Observable<GameFeedDTO> {
    return this.http.get<GameFeedDTO>(`${this.apiUrl}/api/feed`);
  }

  getFeedStream(): Observable<GameFeedDTO> {
    return new Observable<GameFeedDTO>((observer) => {
      const eventSource = new EventSource(`${this.apiUrl}/api/feed/stream`);

      eventSource.onmessage = (event) => {
        this.ngZone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      };

      eventSource.onerror = (err) => this.ngZone.run(() => observer.error(err));

      return () => eventSource.close();
    });
  }
}
