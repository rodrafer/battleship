import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint } from '../constants/interfaces';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, AfterViewInit {
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

  constructor(private fleetDistribution: FleetDistributionService) { }

  private isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
  }
  
  private setShipPosition(): void {
    this.fleet.forEach(ship => {
      for (let i = 1; i <= ship.amount; i++) {
        let shipPosition: BoardPoint[] = this.fleetDistribution.getShipPosition(ship);
        shipPosition.forEach(position => this.shipPositions.push(position));
      }
    })
  }

  private showShipPositions(shipPositions) {
    shipPositions.forEach(point => {
      let shipPoint = document.getElementById(point.x + point.y);
      shipPoint.firstElementChild.innerHTML = 'X';
      let pointIndex = shipPositions.findIndex(sPoint => this.isEqual(sPoint, point));
      (0 <= pointIndex && 3 >= pointIndex) ? shipPoint.style.color = 'red' :
      (4 <= pointIndex && 9 >= pointIndex) ? shipPoint.style.color = 'white' :
      (10 <= pointIndex && 15 >= pointIndex) ? shipPoint.style.color = 'blue' :
      shipPoint.style.color = 'green';
    })
  }

  ngOnInit(): void {
    this.setShipPosition();
    console.log(this.shipPositions);
  }

  ngAfterViewInit(): void {
    this.showShipPositions(this.shipPositions);
  }
    
}
