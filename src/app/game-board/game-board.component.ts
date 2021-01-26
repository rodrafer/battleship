import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  boardTitle = 'battleship';
  isLoading = false;
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  constructor() { }

  ngOnInit(): void {
  }

}
