import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { PlayedGamesComponent } from './played-games/played-games.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FinalResultsComponent } from './final-results/final-results.component';
import { FleetDistributionService } from './services/fleet-distribution.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    DifficultyComponent,
    PlayedGamesComponent,
    MultiplayerComponent,
    GameBoardComponent,
    FinalResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [FleetDistributionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
