import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {catchError, Observable, of, tap} from 'rxjs';

@Component({
  selector: 'app-env',
  imports: [
    CommonModule,
  ],
  templateUrl: './env.html',
  styleUrl: './env.scss',
})
export class Env{

  apiUrl = environment.BACKEND_URL + '/api/env';
  envInfo$: Observable<any>;
  errorMsg: string | null = null;

  constructor(private http: HttpClient) {
    this.envInfo$ = this.http.get(this.apiUrl).pipe(
      tap(() => this.errorMsg = null),
      catchError(err => {
        this.errorMsg = `Failed to load environment info: ${err.message || err.statusText || err}`;
        return of(null);
      })
    );
    console.log(this.apiUrl);
  }


}
