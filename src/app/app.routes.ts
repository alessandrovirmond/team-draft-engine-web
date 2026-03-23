import { Routes } from '@angular/router';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { DraftComponent } from './pages/draft/draft.component';

export const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players', component: PlayerListComponent },
  { path: 'draft', component: DraftComponent },
  { path: '**', redirectTo: '/players' }
];