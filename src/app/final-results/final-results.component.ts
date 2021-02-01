import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PLAYED_GAMES } from '../constants/constants';
import { PlayedGameData } from '../constants/interfaces';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {
  @Input() uid: string;
  @Input() gid: string;
  @Input() strikes: number;
  @Input() strikesToWin: number;
  @Input() startTime: number;
  @Input() usedTurns: number;
  @Input() accuracy: string;
  @Input() difficulty: string;
  endTime: number;
  haveWon: boolean;
  finalStatus: string;
  playedGames: PlayedGameData[];

  @Output() tryAgain = new EventEmitter<boolean>();

  constructor(
    private fleetDistributionService: FleetDistributionService,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.endTime = Date.now();
    const uid = this.route.snapshot.paramMap.get('uid');
    this.playedGames = PLAYED_GAMES.filter(data => data.uid === uid);
    this.strikes === this.strikesToWin ? this.haveWon = true : this.haveWon = false;
    this.haveWon ? this.finalStatus = 'Won' : this.finalStatus = 'Lost';
  }

  onBackToMenuClicked(): void {
    const gameToRegister: PlayedGameData = {
      uid: this.uid,
      gid: this.gid,
      startTime: this.startTime,
      endTime: this.endTime,
      usedTurns: this.usedTurns,
      accuracy: this.accuracy,
      status: this.finalStatus,
      difficulty: this.difficulty,
    };
    // Server adds played game
    this.httpService.registerPlayedGame(this.uid, gameToRegister)
        .subscribe(() => console.log('Game registered!'));
    // this.playedGames.push(gameToRegister);
    this.fleetDistributionService.resetForbiddenPoints();
  }

  onTryAgainClicked(): void {
    this.tryAgain.emit(true);
  }
}
