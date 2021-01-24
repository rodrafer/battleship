import { Component, OnInit } from '@angular/core';
import { UserData, MenuOptions } from '../constants/interfaces';
import { FAKE_DATA, MENU_OPTIONS } from '../constants/constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  title = 'battleship';
  user: UserData;
  options: MenuOptions[] = [];

  constructor() { }

  ngOnInit(): void {
    this.user = FAKE_DATA[0];
    this.options = MENU_OPTIONS;
  }

}
