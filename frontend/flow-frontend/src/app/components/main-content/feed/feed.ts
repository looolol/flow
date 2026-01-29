import { Component, computed, inject, OnInit } from '@angular/core';
import {HighlightCard} from './highlight-card/highlight-card';
import {ScoreCard} from './score-card/score-card';
import {NewsCard} from './news-card/news-card';
import {FantasyCard} from './fantasy-card/fantasy-card';
import {TradeAlertCard} from './trade-alert-card/trade-alert-card';
import { FeedService } from '../../../services/feed.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { SyncService } from '../../../services/sync.service';

@Component({
  selector: 'app-feed',
  imports: [
    HighlightCard,
    ScoreCard,
    NewsCard,
    FantasyCard,
    TradeAlertCard,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  protected feedService = inject(FeedService);
  protected syncService = inject(SyncService);

  feedItems = computed(() => this.feedService.feed()?.items ?? []);

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.feedService.loadFeed();
  }
}
