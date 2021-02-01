import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayedGameData, SavedGameData } from '../constants/interfaces';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-played-games',
  templateUrl: './played-games.component.html',
  styleUrls: ['./played-games.component.scss']
})
export class PlayedGamesComponent implements OnInit {
  uid: string;
  typeOfGame: string;
  gamesToDisplay: any;
  savedGames: SavedGameData;
  playedGames: PlayedGameData;
  gameDifficulty: string;
  gameId: string;
  isLoadDisabled = true;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    const game = this.route.snapshot.paramMap.get('game');
    const uid = this.route.snapshot.paramMap.get('uid');
    this.typeOfGame = game;
    this.uid = uid;
    if (this.typeOfGame === 'played') {
      // Server brings user played games
      this.httpService.getUserPlayedGames(uid)
        .subscribe(playedGames => this.gamesToDisplay = playedGames);
    } else if (this.typeOfGame === 'saved') {
      // Server brings user saved games
      this.httpService.getUserSavedGames(uid)
        .subscribe(savedGames => this.gamesToDisplay = savedGames);
    }
  }

  onOptionClicked(difficulty: string, gid: string): void {
    this.gameDifficulty = difficulty;
    this.gameId = gid;
    this.isLoadDisabled = false;
  }

  // Get selected game status from the server, communicate game board component
  // that Load Game was clicked and send it the selected game status.
  // THIS IS DONE THROUG DATA ROUTER LINK PARAMETER IN TEMPLATE
}
