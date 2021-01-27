import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit {
  @Input() strikes: number;
  @Input() strikesToWin: number;
  haveWon: boolean;

  constructor() { }

  ngOnInit(): void {
    this.strikes === this.strikesToWin ? this.haveWon = true : this.haveWon = false;
  }

}
