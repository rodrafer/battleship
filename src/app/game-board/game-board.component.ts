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
  turnsLeft = Infinity;
  usedTurns = 0;
  successTurns = 0;
  accuracy = '0';
  userHasLeft: boolean;
  difficulty: string;
  startTime: number;
  endTime: number;
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
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
        const shipPosition: BoardPoint[] = this.fleetDistribution.getShipPosition(ship);
        shipPosition.forEach(position => this.shipPositions.push(position));
      }
    });
  }

  onCellClicked(cellId: string): void {
    const clickedCell = document.getElementById(cellId);
    if (clickedCell.className === 'table-cell') {
      if (this.shipPositions.some(point => point.x === cellId[0] && point.y.toString() === cellId[1])) {
        clickedCell.className = 'table-cell-clicked';
        const strikeShot = document.createElement('p');
        strikeShot.innerHTML = 'X';
        strikeShot.style.color = 'red';
        strikeShot.style.margin = '0';
        clickedCell.appendChild(strikeShot);
        ++this.successTurns;
      } else {
        clickedCell.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        clickedCell.className = 'table-cell-clicked';
      }
      ++this.usedTurns;
      --this.turnsLeft;
      this.accuracy = ((this.successTurns / this.usedTurns) * 100).toFixed(2);
    }
  }

  onBackClicked(): void {
    this.fleetDistribution.resetForbiddenPoints();
    this.userHasLeft = true;
    this.userLeft.emit(this.userHasLeft);
  }
}
