import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint } from '../constants/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  boardTitle = 'battleship';
  isLoading = false;
  isMultiplayer = false;
  userHasLeft: boolean;
  difficulty: string;
  turnsLeft: number = Infinity;
  usedTurns: number = 0;
  successTurns: number = 0;
  accuracy: string = '0';
  startTime: number;
  endTime: number;
  rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shipPositions: BoardPoint[] = [];
  fleet: Ship[] = [
    {
      name: 'carrier',
      length: 4,
      amount: 1
    },
    {
      name: 'destroyer',
      length: 3,
      amount: 2
    },
    {
      name: 'submarine',
      length: 2,
      amount: 3
    },
    {
      name: 'patrol-boat',
      length: 1,
      amount: 4
    }
  ];
  @Output() userLeft = new EventEmitter<boolean>();

  constructor(
    private fleetDistribution: FleetDistributionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    switch (this.difficulty) {
      case 'Lieutenant':
        this.turnsLeft = 100;
        break;
      case 'Almirant':
        this.turnsLeft = 50;
        break;
    }
    this.setFleetPosition();
    console.log(this.shipPositions);
    this.startTime = Date.now();
  }
  
  private setFleetPosition(): void {
    this.fleet.forEach(ship => {
      for (let i = 1; i <= ship.amount; i++) {
        let shipPosition: BoardPoint[] = this.fleetDistribution.getShipPosition(ship);
        shipPosition.forEach(position => this.shipPositions.push(position));
      }
    })
  }
 
  onCellClicked(cellId: string) {
    let clickedCell = document.getElementById(cellId);
    if (clickedCell.className === 'table-cell') {
      if (this.shipPositions.some(point => point.x === cellId[0] && point.y.toString() === cellId[1])) {
        clickedCell.className = 'table-cell-clicked';
        let strikeShot = document.createElement('p');
        strikeShot.innerHTML = 'X';
        strikeShot.style.color = 'red';
        strikeShot.style.margin = '0';
        clickedCell.appendChild(strikeShot);
        this.difficulty === 'Cadet' ? this.successTurns : ++this.successTurns;
      } else {
        clickedCell.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        clickedCell.className = 'table-cell-clicked';
      }
      this.difficulty === 'Cadet' ? this.turnsLeft : --this.turnsLeft; ++this.usedTurns;
      this.accuracy = ((this.successTurns/this.usedTurns)*100).toFixed(2);
    }
  }

  onBackClicked() {
    this.fleetDistribution.resetForbiddenPoints();
    this.userHasLeft = true;
    this.userLeft.emit(this.userHasLeft);
  }
}
