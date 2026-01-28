import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GameFeedDTO } from '@flow/shared';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getFeed(): Observable<GameFeedDTO> {
    return this.http.get<GameFeedDTO>(`${this.apiUrl}/api/feed`);
  }
}
