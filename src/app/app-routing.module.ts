import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { PlayedGamesComponent } from './played-games/played-games.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FinalResultsComponent } from './final-results/final-results.component';

const routes: Routes = [
  {path: '', redirectTo: 'main-menu', pathMatch: 'full'},
  {path: 'main-menu', component: MainMenuComponent, pathMatch: 'full'},
  {path: 'saved-games/:id', component: SavedGamesComponent},
  {path: 'difficulty', component: DifficultyComponent},
  {path: 'played-games/:id', component: PlayedGamesComponent},
  {path: 'multiplayer/:id', component: MultiplayerComponent},
  {path: 'game-board/:id', component: GameBoardComponent},
  {path: 'final-results/:id', component: FinalResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
