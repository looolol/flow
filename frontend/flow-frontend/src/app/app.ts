import {Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import {Navigation} from './components/navigation/navigation';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {ScreenService} from './services/screen.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Navigation,
    MatSidenavModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(public screen: ScreenService) {}

  drawerMode = computed(() => this.screen.isMobile() ? 'over' : 'side');
  drawerOpened = computed(() => !this.screen.isMobile());

}
