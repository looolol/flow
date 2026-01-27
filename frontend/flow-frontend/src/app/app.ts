import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Env} from './components/env/env';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Env
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('flow-frontend');
}
