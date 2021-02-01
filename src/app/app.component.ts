import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battleship';
  userHasLeft: boolean;

  constructor(public angularAuth: AngularFireAuth) { }

  signInClicked(): void {
    this.angularAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signOutClicked(): void {
    this.angularAuth.signOut();
  }

  onActivate(): void {
    const userLeft = history.state.flag;
    userLeft ? this.userHasLeft = userLeft : this.userHasLeft = false;
  }

  onBackClicked(): void {
    this.userHasLeft = false;
  }
}
