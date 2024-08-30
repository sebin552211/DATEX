import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;  
  private mailStatusUpdatedSource = new BehaviorSubject<void>(undefined);  // Use undefined instead of null
  mailStatusUpdated$ = this.mailStatusUpdatedSource.asObservable();

  constructor() {
    this.startConnection();
    this.addMailStatusListener();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7259/mailStatusHub')
      .withAutomaticReconnect()   
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch((err) => console.log('Error while starting SignalR connection: ' + err));
  }

  private addMailStatusListener() {
    this.hubConnection.on('MailStatusUpdated', () => {
      this.mailStatusUpdatedSource.next();
    });
  }
}
