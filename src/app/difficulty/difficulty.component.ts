import { Component, OnInit } from '@angular/core';
import { DifficultyOptions } from '../constants/interfaces';
import { DIFFICULTY_OPTIONS } from '../constants/constants';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss']
})
export class DifficultyComponent implements OnInit {
  difficultyTitle = 'Choose a difficulty';
  isLoading = false;
  uid: string;
  difficulties: DifficultyOptions[] = [];

  constructor() { }

  ngOnInit(): void {
    this.uid = '12345';
    this.difficulties = DIFFICULTY_OPTIONS;
  }

}
