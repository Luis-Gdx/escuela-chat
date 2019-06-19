import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { URI } from './api';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = null;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private userService: UsersService
  ) {
    if (this.isAuthenticated()) {
      this.user = this.getUserData();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${URI}/users/login`, { email, password }).pipe(
      map(
        res => {
          const { user, token } = res;
          this.user = user;
          this.saveToken(token);
          return user;
        }
      )
    );
  }

  signIn(newUser: User): Observable<any> {
    return this.http.post<any>(`${URI}/users/signin`, newUser).pipe(
      map(
        res => {
          if (!Object.keys(res).find(key => key === 'errmsg')) {
            const { user, token } = res;
            this.user = user;
            this.saveToken(token);
            return user;
          } else {
            return { error: true };
          }
        }
      )
    );
  }

  isAuthenticated() {
    // return !this.jwtHelper.isTokenExpired();
    return !!this.getToken();
  }

  async logout() {
    await this.userService.setStatus(this.user._id, false).toPromise();
    this.deleteToken();
    this.router.navigate(['/auth']);
  }

  saveToken(token) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return this.jwtHelper.tokenGetter();
  }

  deleteToken() {
    localStorage.removeItem('access_token');
  }

  getUserData() {
    return this.jwtHelper.decodeToken();
  }

  hasRole(role: string): boolean {
    if (this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }

  getTokenAndSave() {
    return this.http.get<any>(`${URI}/users/get-token`).pipe(
      map(
        ({ token }) => {
          this.saveToken(token);
          this.user = this.getUserData();
          return this.user;
        }
      )
    );
  }

}
