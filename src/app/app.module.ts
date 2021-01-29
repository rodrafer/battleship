import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { PlayedGamesComponent } from './played-games/played-games.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FinalResultsComponent } from './final-results/final-results.component';
import { FleetDistributionService } from './services/fleet-distribution.service';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SavedGamesComponent,
    DifficultyComponent,
    PlayedGamesComponent,
    MultiplayerComponent,
    GameBoardComponent,
    FinalResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [FleetDistributionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
