import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FAKE_DATA } from '../constants/constants';
import { UserData } from '../constants/interfaces';


@Component({
  selector: 'app-played-games',
  templateUrl: './played-games.component.html',
  styleUrls: ['./played-games.component.scss']
})
export class PlayedGamesComponent implements OnInit {
  gamesToDisplay: any;
  typeOfGame: string;
  userData: UserData;
  gameDifficulty: string;
  isLoadDisabled = true;
  isLoading = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const game = this.route.snapshot.paramMap.get('game');
    const uid = this.route.snapshot.paramMap.get('uid');
    this.typeOfGame = game;
    [this.userData] = FAKE_DATA.filter(data => data.uid === uid);
    const {playedGames, savedGames} = this.userData;
    if (this.typeOfGame === 'played') {
      this.gamesToDisplay = playedGames;
    } else if (this.typeOfGame === 'saved') {
      this.gamesToDisplay = savedGames;
    }
  }

  onOptionClicked(difficulty: string): void {
    this.gameDifficulty = difficulty;
    this.isLoadDisabled = false;
  }

}
