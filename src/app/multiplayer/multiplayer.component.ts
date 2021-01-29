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
  joinButtonVisible = false;
  joinButtonDisabled = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onInputKeypress(inputValue: string): void {
    let input = document.getElementsByClassName('form-control-lg');
    if (inputValue.length === 8) {
      input.item(0).classList.remove('is-invalid');
      input.item(0).classList.add('is-valid');
      this.joinButtonVisible = true;
    } else {
      input.item(0).classList.add('is-invalid');
    }
  }

  onGenerateCodeClicked(): void {
    this.roomCode = uuidv4().slice(0, 8).toUpperCase();
    this.codeGenerated = true;
    this.joinButtonVisible = true;
  }

  onCopyClicked(): void {
    let copyText = document.getElementById("generated-code-input") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
  }

  onJoinRoomClicked(): void {
    this.joinButtonDisabled = true;
    let joinButton = document.getElementById('enter-room-button');
    joinButton.textContent = 'Waiting the enemy to join...';
    joinButton.style.width = 'auto';
    setTimeout(() => {
      this.router.navigate(['game-board/Multiplayer/12345'])
    }, 5000);
  }
}
