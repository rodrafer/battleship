import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FAKE_DATA } from '../constants/constants';
import { UserData } from '../constants/interfaces';
import { FleetDistributionService } from '../services/fleet-distribution.service';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {
  @Input() gid: number;
  @Input() strikes: number;
  @Input() strikesToWin: number;
  @Input() startTime: number;
  @Input() usedTurns: number;
  @Input() accuracy: string;
  @Input() difficulty: string;
  endTime: number;
  haveWon: boolean;
  finalStatus: string;
  userData: UserData;

  constructor(
    private fleetDistributionService: FleetDistributionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.endTime = Date.now();
    const uid = this.route.snapshot.paramMap.get('uid');
    [this.userData] = FAKE_DATA.filter(data => data.uid === uid);
    this.strikes === this.strikesToWin ? this.haveWon = true : this.haveWon = false;
    this.haveWon ? this.finalStatus = 'Won' : this.finalStatus = 'Lost';
  }

  onBackToMenuClicked() {
    const gameToRegister = {
      gid: this.gid,
      startTime: this.startTime,
      endTime: this.endTime,
      usedTurns: this.usedTurns,
      accuracy: this.accuracy,
      status: this.finalStatus,
      difficulty: this.difficulty,
    }
    this.userData.playedGames.push(gameToRegister);
    this.fleetDistributionService.resetForbiddenPoints();
  }
}
