import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLAYED_GAMES, SAVED_GAMES } from '../constants/constants';
import { PlayedGameData, SavedGameData } from '../constants/interfaces';


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
  isLoadDisabled = true;
  isLoading = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const game = this.route.snapshot.paramMap.get('game');
    const uid = this.route.snapshot.paramMap.get('uid');
    this.typeOfGame = game;
    this.uid = uid;
    if (this.typeOfGame === 'played') {
      // Server brings user played games
      const playedGames = PLAYED_GAMES.filter(data => data.uid === uid);
      this.gamesToDisplay = playedGames;
    } else if (this.typeOfGame === 'saved') {
      // Server brings user saved games
      const savedGames = SAVED_GAMES.filter(data => data.uid === uid);
      this.gamesToDisplay = savedGames;
    }
  }

  onOptionClicked(difficulty: string): void {
    this.gameDifficulty = difficulty;
    this.isLoadDisabled = false;
  }

  onLoadGameClicked(): void {
    // Get selected game status from the server, communicate game board component
    // that Load Game was clicked and send it the selected game status.
  }
}
