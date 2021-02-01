import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements OnInit {
  codeGenerated = false;
  roomCode = '';
  isInputDisabled = false;
  isGenerateCodeDisabled = false;
  isJoinButtonDisabled = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private joinRoom(): void {
    this.isJoinButtonDisabled = true;
    const joinButton = document.getElementById('enter-room-button');
    joinButton.style.visibility = 'visible';
    joinButton.style.width = 'auto';
    if (this.codeGenerated) {
      joinButton.textContent = 'Waiting the enemy to join...';
      // Server listens for data base insertions in multiplayer.
      // If some insertion with the same this.roomCode arrises, navigate to game board and delete user's code.
    } else {
      joinButton.textContent = 'Checking if the enemy has joined...';
      // Server adds this.roomCode for this user and checks if there is any user
      // with the same room code. If so, navigate to game board and delete user's code.
    }
    setTimeout(() => {
      this.router.navigate(['game-board/Multiplayer/12345']);
    }, 5000);
  }

  onInputKeyup(inputValue: string): void {
    this.isGenerateCodeDisabled = true;
    const input = document.getElementsByClassName('form-control-lg');
    if (inputValue.length === 8) {
      input.item(0).classList.remove('is-invalid');
      input.item(0).classList.add('is-valid');
      const joinButton = document.getElementById('enter-room-button');
      joinButton.style.visibility = 'visible';
      this.isJoinButtonDisabled = false;
    } else {
      input.item(0).classList.add('is-invalid');
      this.isJoinButtonDisabled = true;
    }
  }

  onGenerateCodeClicked(): void {
    this.roomCode = uuidv4().slice(0, 8).toUpperCase();
    this.isInputDisabled = true;
    this.codeGenerated = true;
    const joinButton = document.getElementById('enter-room-button');
    joinButton.style.visibility = 'visible';
    // Server adds a code for this user
    this.joinRoom();
  }

  onCopyClicked(): void {
    const copyText = document.getElementById('generated-code-input') as HTMLInputElement;
    copyText.select();
    document.execCommand('copy');
  }

  onJoinRoomClicked(): void {
    this.joinRoom();
  }
}
