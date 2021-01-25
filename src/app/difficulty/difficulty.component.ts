import { Component, OnInit } from '@angular/core';
import { UserData, DifficultyOptions } from '../constants/interfaces';
import { FAKE_DATA, DIFFICULTY_OPTIONS } from '../constants/constants';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {
  difficultyTitle = 'Choose a difficulty';
  isLoading = false;
  user: UserData;
  difficulties: DifficultyOptions[] = [];

  constructor() { }

  ngOnInit(): void {
    this.user = FAKE_DATA[0];
    this.difficulties = DIFFICULTY_OPTIONS;
  }

}
