import {Component, computed, OnInit, signal} from '@angular/core';
import {HighlightCard} from './highlight-card/highlight-card';
import {ScoreCard} from './score-card/score-card';
import {NewsCard} from './news-card/news-card';
import {FantasyCard} from './fantasy-card/fantasy-card';
import {TradeAlertCard} from './trade-alert-card/trade-alert-card';
import { FeedService } from '../../../services/feed.service';
import { GameFeedDTO } from '@flow/shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

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
  loading = signal(true);
  error = signal<string | null>(null);

  feed = signal<GameFeedDTO | null>(null);
  feedItems = computed(() => this.feed()?.items ?? []);

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getFeed().subscribe({
      next: (data) => {
        this.feed.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load feed');
        this.loading.set(false);
      },
    });
  }
}
