import { Component, OnInit } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint, UserData, SavedGameData } from '../constants/interfaces';
import { FAKE_DATA, FLEET } from '../constants/constants'
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from "uuid";

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
  numberOfStrikes = 0;
  accuracy = '0.00';
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isLoadedGame: boolean;
  userHasLeft: boolean;
  difficulty: string;
  startTime: number;
  endTime: number;
  gid: number;
  shipPositions: BoardPoint[] = [];
  clickedCellIds: string[] = [];
  fleet: Ship[];
  userData: UserData;
  userSavedGames: SavedGameData[];
  loadedGameData: SavedGameData;

  constructor(
    private fleetDistributionService: FleetDistributionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fleet = FLEET;
    const uid = this.route.snapshot.paramMap.get('uid');
    [this.userData] = FAKE_DATA.filter(data => data.uid === uid);
    this.userSavedGames = this.userData.savedGames;
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    switch (this.difficulty) {
      case 'Lieutenant':
        this.turnsLeft = 100;
        break;
      case 'Almirant':
        this.turnsLeft = 50;
        break;
    }
    if (this.isLoadedGame) {
      this.startTime = this.loadedGameData.startTime;
      this.gid = this.loadedGameData.gid;
      this.shipPositions = this.loadedGameData.shipPositions;
    } else {
      this.startTime = Date.now();
      this.gid = uuidv4().slice(0, 8);
      this.setFleetPosition();
      console.log(this.shipPositions);
    }
  }

  private setFleetPosition(): void {
    this.fleet.forEach(ship => {
      for (let i = 1; i <= ship.amount; i++) {
        const shipPosition: BoardPoint[] = this.fleetDistributionService.getShipPosition(ship);
        shipPosition.forEach(position => this.shipPositions.push(position));
      }
    });
  }

  onCellClicked(cellId: string): void {
    this.clickedCellIds.push(cellId);
    let xCoord = cellId[0];
    let yCoord;
    if (cellId.length === 3) {
      yCoord = cellId[1] + cellId[2];
    } else if (cellId.length === 2) {
      yCoord = cellId[1];
    }
    const clickedCell = document.getElementById(cellId);
    if (clickedCell.className === 'table-cell') {
      if (
        this.shipPositions.some(point => point.x == xCoord && point.y.toString() == yCoord)
      ) {
        clickedCell.className = 'table-cell-clicked';
        const strikeShot = document.createElement('p');
        strikeShot.textContent = 'X';
        strikeShot.style.color = 'red';
        strikeShot.style.margin = '0';
        clickedCell.appendChild(strikeShot);
        ++this.numberOfStrikes;
      } else {
        clickedCell.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        clickedCell.className = 'table-cell-clicked';
      }
      ++this.usedTurns;
      --this.turnsLeft;
      this.accuracy = ((this.numberOfStrikes / this.usedTurns) * 100).toFixed(2);
    }
  }

  onBackClicked(): void {
    this.fleetDistributionService.resetForbiddenPoints();
    this.userHasLeft = true;
  }

  onSaveClicked() {
    const gameToSave = {
      gid: this.gid,
      startTime: this.startTime,
      turnsLeft: this.turnsLeft,
      usedTurns: this.usedTurns,
      numberOfStrikes: this.numberOfStrikes,
      accuracy: this.accuracy,
      difficulty: this.difficulty,
      shipPositions: this.shipPositions,
      clickedCellIds: this.clickedCellIds
    }
    if (this.isLoadedGame) {
      const loadedGameIndex = this.userSavedGames.findIndex(game => game.gid === gameToSave.gid);
      this.userSavedGames[loadedGameIndex] = {...this.userSavedGames[loadedGameIndex], ...gameToSave};
    } else {
      this.userSavedGames.push(gameToSave);
      this.fleetDistributionService.resetForbiddenPoints();
    }
  }
}
