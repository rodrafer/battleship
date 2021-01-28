import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship';
  userHasLeft: boolean;

  onBackClicked(): void {
    this.userHasLeft = false;
  }

  handleComponent(userLeft: boolean): void {
    console.log(userLeft);
    userLeft ? this.userHasLeft = true : this.userHasLeft = false;
  }
}
