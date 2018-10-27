import { Component } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SignalrService } from '../../services/SignalrService';
import { Player } from "../../models/PlayerModel";

@Component({
  selector: 'game-room',
  templateUrl: './game-room.component.html'
})

export class GameRoomComponent {
  public hubConnection: signalR.HubConnection;

  adressed = 'HughJass';
  playerName = 'HughJass';
  password = '';
  nick = 'WebApp';
  message = '';
  messages: string[] = [];
  constValue: number = 6;

  constructor(private signalrService: SignalrService) {
    this.hubConnection = signalrService.getConnection();
  }

  ngOnInit() {
    this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });

    this.hubConnection.on('sendToPlayer', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });

    this.hubConnection.on('sendUpdateToGM', (name: string, value: Player) => {
      this.constValue = value.charisma;
    });
  }

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }
} 
