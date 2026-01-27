import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly apiUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  getFeed(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
