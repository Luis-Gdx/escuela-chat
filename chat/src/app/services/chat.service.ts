import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { URI } from './api';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: SocketIOClient.Socket = null;
  constructor(private auth: AuthService, private http: HttpClient) {
    this.socket = io(URI);
  }

  sendMessage(content) {
    this.socket.emit('chat', { content, user: this.auth.user });
  }

  receiveChat(fn) {
    return this.socket.on('chat', fn);
  }
  getMessages(): Observable<any> {
    return this.http.get(`${URI}/messages`);
  }

  getUsers(fn): any {
    return this.socket.on('users', fn);
  }

  getUsersClose(): any {
    return this.socket.close();
  }
}
