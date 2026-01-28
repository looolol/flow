import {Component, computed, EventEmitter, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ScreenService} from '../../services/screen.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  @Output() menuClick = new EventEmitter<void>();

  showMenuButton = computed(() => this.screen.isMobile());

  constructor(public screen: ScreenService) {}

}
