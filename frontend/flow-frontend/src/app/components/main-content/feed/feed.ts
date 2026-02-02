import { Component, computed, inject, OnInit } from '@angular/core';
import {HighlightCard} from './highlight-card/highlight-card';
import {ScoreCard} from './score-card/score-card';
import {NewsCard} from './news-card/news-card';
import {FantasyCard} from './fantasy-card/fantasy-card';
import {TradeAlertCard} from './trade-alert-card/trade-alert-card';
import { FeedService } from '../../../services/feed.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feed',
  imports: [
    HighlightCard,
    ScoreCard,
    NewsCard,
    FantasyCard,
    TradeAlertCard,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  protected feedService = inject(FeedService);

  feedItems = computed(() => this.feedService.feed()?.items ?? []);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.feedService.load();
  }
}
