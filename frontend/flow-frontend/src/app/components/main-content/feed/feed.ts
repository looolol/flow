import { Component } from '@angular/core';
import {HighlightCard} from './highlight-card/highlight-card';
import {ScoreCard} from './score-card/score-card';
import {NewsCard} from './news-card/news-card';
import {FantasyCard} from './fantasy-card/fantasy-card';
import {TradeAlertCard} from './trade-alert-card/trade-alert-card';

@Component({
  selector: 'app-feed',
  imports: [
    HighlightCard,
    ScoreCard,
    NewsCard,
    FantasyCard,
    TradeAlertCard
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {

}
