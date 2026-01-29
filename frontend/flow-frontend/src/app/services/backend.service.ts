import { Injectable } from '@angular/core';
import { GameFeedDTO } from '@flow/shared';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  triggerSync(): Observable<{ status: string }> {
    return this.http.post<{status: string}>(`${this.apiUrl}/api/sync`, {});
  }

  getFeed(): Observable<GameFeedDTO> {
    return this.http.get<GameFeedDTO>(`${this.apiUrl}/api/feed`);
  }

}
