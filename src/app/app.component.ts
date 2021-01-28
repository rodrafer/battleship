import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship';
  userHasLeft: boolean;

  onBackClicked() {
    this.userHasLeft = false;
  }

  handleComponent(userLeft: boolean) {
    console.log(userLeft);
    userLeft ? this.userHasLeft = true : this.userHasLeft = false;
  }
}
