import { Routes } from '@angular/router';
import {Feed} from './components/main-content/feed/feed';
import {ScoresPage} from './components/main-content/scores-page/scores-page';
import {TeamsPage} from './components/main-content/teams-page/teams-page';
import {SettingsPage} from './components/main-content/settings-page/settings-page';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: Feed },
  { path: 'scores', component: ScoresPage },
  { path: 'teams', component: TeamsPage },
  { path: 'settings', component: SettingsPage },
];
