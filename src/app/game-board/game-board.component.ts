import { Component, OnInit } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint, SavedGameData, LoadedGameData, StatusData } from '../constants/interfaces';
import { FLEET, SAVED_GAMES } from '../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  boardTitle = 'battleship';
  isLoading = false;
  isMultiplayer = false;
  enemyHasWon = false;
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
  gid: string;
  uid: string;
  shipPositions: BoardPoint[] = [];
  clickedCellsIds: string[] = [];
  fleet: Ship[];
  userSavedGames: SavedGameData[];
  userStatus: StatusData[] = [];
  loadedGameData: LoadedGameData;

  constructor(
    private fleetDistributionService: FleetDistributionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fleet = FLEET;
    const uid = this.route.snapshot.paramMap.get('uid');
    this.uid = uid;
    // Communicate from played games component if Load Game was clicked, set isLoadedGame to true,
    // get selected game ship status from the server and assign it to loadedGameData
    this.userSavedGames = SAVED_GAMES.filter(data => data.uid === uid);
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    switch (this.difficulty) {
      case 'Lieutenant':
        this.turnsLeft = 100;
        break;
      case 'Almirant':
        this.turnsLeft = 50;
        break;
      case 'Multiplayer':
        this.isMultiplayer = true;
        break;
    }
    if (this.isLoadedGame) {
      this.startTime = this.loadedGameData.savedGameToLoad.startTime;
      this.gid = this.loadedGameData.savedGameToLoad.gid;
      this.shipPositions = this.loadedGameData.shipPositions;
    } else {
      this.startTime = Date.now();
      this.gid = uuidv4();
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

  private updateGameBoard(cellId: string): void {
    this.clickedCellsIds.push(cellId);
    const xCoord = cellId[0];
    let yCoord;
    if (cellId.length === 3) {
      yCoord = cellId[1] + cellId[2];
    } else if (cellId.length === 2) {
      yCoord = cellId[1];
    }
    const clickedCell = document.getElementById(cellId);
    if (clickedCell.className === 'table-cell') {
      if (
        this.shipPositions.some(point => point.x === xCoord && point.y.toString() === yCoord)
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
    if (this.isMultiplayer) {
      this.userHasLeft = true;
      // Communicate to the App component that user has left
    }
  }

  onCellClicked(cellId: string): void {
    this.updateGameBoard(cellId);
  }

  onSaveClicked(): void {
    const gameToSave: SavedGameData = {
      uid: this.uid,
      gid: this.gid,
      startTime: this.startTime,
      turnsLeft: this.turnsLeft,
      usedTurns: this.usedTurns,
      numberOfStrikes: this.numberOfStrikes,
      accuracy: this.accuracy,
      difficulty: this.difficulty
    };
    const statusToSave: StatusData = {
      shipPositions: this.shipPositions,
      clickedCellsIds: this.clickedCellsIds
    }
    if (this.isLoadedGame) {
      // Server updates database
      const loadedGameIndex = this.userSavedGames.findIndex(game => game.gid === gameToSave.gid);
      this.userSavedGames[loadedGameIndex] = {...this.userSavedGames[loadedGameIndex], ...gameToSave};
    } else {
      // Server adds a saved game, several ship positions and several clicked cells ids
      this.userSavedGames.push(gameToSave);
      console.log(this.userSavedGames)
      this.userStatus.push(statusToSave);
      console.log(this.userStatus)
      this.fleetDistributionService.resetForbiddenPoints();
    }
  }
}
