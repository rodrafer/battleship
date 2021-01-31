import { Component, OnInit } from '@angular/core';
import { MenuOptions } from '../constants/interfaces';
import { MENU_OPTIONS } from '../constants/constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  menuTitle = 'battleship';
  uid: string;
  options: MenuOptions[] = [];

  constructor() { }

  ngOnInit(): void {
    this.uid = '12345';
    this.options = MENU_OPTIONS;
  }

}
