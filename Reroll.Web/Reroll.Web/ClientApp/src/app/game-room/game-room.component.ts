import { Component } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { SignalrService } from '../../services/SignalrService';
import { Player } from "../../models/Player";
import { MessageService } from '../../services/MessageService';
import { Subscription } from 'rxjs/Subscription';
import { ActivityMessage } from '../../models/ActivityMessage';

@Component({
  selector: 'game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})

export class GameRoomComponent {
  public hubConnection: signalR.HubConnection;

  subscription: Subscription;
  playersData: Player[];
  activityMessages: ActivityMessage[];

  constructor(private signalrService: SignalrService, private messageService: MessageService) {
    this.hubConnection = signalrService.getConnection();
    this.hubConnection.invoke('getInitialGmData')
      .catch(err => console.error(err));
    this.hubConnection.invoke('getInitialLogs')
      .catch(err => console.error(err));
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.playersData = message.text as Player[];
    });
  }

  ngOnInit() {
    this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {

    });
    this.hubConnection.on('sendToPlayer', (nick: string, receivedMessage: string) => {

    });
    this.hubConnection.on('receiveInitialLogs', (logs: ActivityMessage[]) => {
      this.activityMessages = logs;
    });
    this.hubConnection.on('receiveActivityLog', (message: ActivityMessage) => {
      this.activityMessages.push(message);
    });
    this.hubConnection.on('sendUpdateToGM', (name: string, value: Player) => {
      let updatePlayer = this.playersData.find(p => p.name === value.name);
      let index = this.playersData.indexOf(updatePlayer);
      this.playersData[index] = value;
    });
  }

  public sendMessage(playerData): void {
    this.hubConnection
      .invoke('updatePlayerModel', playerData.name, playerData)
      .catch(err => console.error(err));
  }
} 
