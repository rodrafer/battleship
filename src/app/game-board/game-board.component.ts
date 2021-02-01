import { Component, OnInit } from '@angular/core';
import { FleetDistributionService } from '../services/fleet-distribution.service';
import { Ship, BoardPoint, SavedGameData, LoadedGameData, StatusData } from '../constants/interfaces';
import { FLEET } from '../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '../services/http.service';

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
  numberOfStrikes: number;
  accuracy = '0.00';
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isLoadedGame = false;
  userHasLeft: boolean;
  difficulty: string;
  startTime: number;
  endTime: number;
  gid: string;
  uid: string;
  shipPositions: BoardPoint[] = [];
  clickedCellsIds: string[] = [];
  fleet: Ship[];
  userStatus: StatusData[] = [];
  loadedGameData: any;

  constructor(
    private fleetDistributionService: FleetDistributionService,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.fleet = FLEET;
    this.uid = this.route.snapshot.paramMap.get('uid');
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
    // Communicate from played games component if Load Game was clicked, set isLoadedGame to true,
    // get selected game ship status from the server and assign it to loadedGameData.
    // Then call to updateGameBoard for each clicked cell id of loadedGameData.
    const routeData = history.state.data;
    if (routeData) {
      this.gid = routeData;
      this.isLoadedGame = true;
      this.httpService.getSavedGameStatus(this.uid, this.gid)
        .subscribe(loadedGameData => {
          loadedGameData.shipPositionsEntries.forEach(entry => {
            this.shipPositions.push({ x: entry.x, y: entry.y });
          });
          this.numberOfStrikes = 0;
          loadedGameData.clickedCellsEntries.forEach(entry => {
            this.updateGameBoard(entry.cell);
          });
          this.startTime = loadedGameData.savedGameInfo[0].start_time;
          this.clickedCellsIds = [];
          console.log('Loaded game');
        });
    } else {
      this.startTime = Date.now();
      this.gid = uuidv4();
      this.setFleetPosition();
      this.numberOfStrikes = 0;
      console.log('New game');
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
        // const strikeShot = document.createElement('img');
        strikeShot.textContent = 'X';
        strikeShot.style.color = 'red';
        // strikeShot.style.height = '20px';
        // strikeShot.src = '../../assets/fire-icon.png';
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
      // THIS IS DONE THROUG DATA ROUTER LINK PARAMETER IN TEMPLATE
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
      strikes: this.numberOfStrikes,
      accuracy: this.accuracy,
      difficulty: this.difficulty
    };
    const statusToSave: StatusData = {
      shipPositions: this.shipPositions,
      clickedCellsIds: this.clickedCellsIds
    };
    if (this.isLoadedGame) {
      // Server updates database
      this.httpService.updateSavedGame(this.uid, this.gid, gameToSave)
        .subscribe(() => console.log('Game saved!'));
      statusToSave.clickedCellsIds.forEach(cellId => {
        this.httpService.addClickedCellId(this.uid, this.gid, cellId)
          .subscribe(() => console.log('Clicked cells saved!'));
      });
    } else {
      // Server adds a saved game, several ship positions and several clicked cells ids
      this.httpService.registerSavedGame(this.uid, gameToSave)
        .subscribe(() => console.log('Game saved!'));
      statusToSave.shipPositions.forEach(position => {
        this.httpService.addShipPosition(this.uid, this.gid, position)
          .subscribe(() => console.log('Position saved!'));
      });
      statusToSave.clickedCellsIds.forEach(cellId => {
        this.httpService.addClickedCellId(this.uid, this.gid, cellId)
          .subscribe(() => console.log('Clicked cells saved!'));
      });
      this.fleetDistributionService.resetForbiddenPoints();
    }
  }

  onTryAgainClicked(): void {
    this.fleetDistributionService.resetForbiddenPoints();
    this.ngOnInit();
  }
}
