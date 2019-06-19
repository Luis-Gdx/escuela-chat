import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { URI } from './api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${URI}/users`);
  }

  getUserById(id) {
    return this.http.get(`${URI}/users/${id}`);
  }

  update(id, user) {
    return this.http.put(`${URI}/users/${id}`, user);
  }

  setStatus(id, status) {
    return this.update(id, { status });
  }
}
