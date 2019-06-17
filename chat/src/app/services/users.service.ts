import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserById(id) {
    return this.http.get('http://localhost:3000/users/' + id);
  }

  update(id, user) {
    return this.http.put('http://localhost:3000/users/' + id, user);
  }

  setStatus(id, status) {
    return this.update(id, { status });
  }
}
