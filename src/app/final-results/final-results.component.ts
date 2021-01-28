import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {
  @Input() strikes: number;
  @Input() strikesToWin: number;
  @Input() startTime: number;
  @Input() usedTurns: number;
  @Input() accuracy: number;
  endTime: number;
  haveWon: boolean;

  constructor() { }

  ngOnInit(): void {
    this.endTime = Date.now();
    this.strikes === this.strikesToWin ? this.haveWon = true : this.haveWon = false;
  }

}
