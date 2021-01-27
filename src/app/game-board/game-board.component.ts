import { Component, OnInit } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint } from '../constants/interfaces';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  boardTitle = 'battleship';
  isLoading = false;
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

  constructor(
    private fleetDistribution: FleetDistributionService,
  ) { }

  ngOnInit(): void {
    this.setShipPosition();
    console.log(this.shipPositions);
  }
  
  private setShipPosition(): void {
    this.fleet.forEach(ship => {
      for (let i = 1; i <= ship.amount; i++) {
        let shipPosition: BoardPoint[] = this.fleetDistribution.getShipPosition(ship);
        shipPosition.forEach(position => this.shipPositions.push(position));
      }
    })
  }
 
  onCellClicked(cellId: string) {
    let clickedCell = document.getElementById(cellId);
    if (this.shipPositions.some(point => point.x === cellId[0] && point.y.toString() === cellId[1])) {
      clickedCell.className = 'table-cell disable-hover';
      let strikeShot = document.createElement('p');
      strikeShot.innerHTML = 'X';
      strikeShot.style.color = 'red';
      strikeShot.style.margin = '0';
      clickedCell.appendChild(strikeShot);
    } else {
      clickedCell.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      clickedCell.className = 'table-cell disable-hover';
    }
  }  
}
