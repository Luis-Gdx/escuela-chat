import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: SocketIOClient.Socket = null;
  constructor(private auth: AuthService) {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(message) {
    this.socket.emit('chat', { message, user: this.auth.user });
  }

  receiveChat(fn) {
    return this.socket.on('chat', fn);
  }

  getUsers(fn): any {
    return this.socket.on('users', fn);
  }

  getUsersClose(): any {
    return this.socket.close();
  }
}
