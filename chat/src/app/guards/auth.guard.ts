import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.auth.isAuthenticated();
    console.log(this.auth.getUserData());
    if (next.data.auth === false) {
      if (isAuth) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }
    if (!isAuth) {
      this.router.navigate(['/auth']);
      return false;
    }
    if (this.auth.isAuthenticated()) {
      return this.auth.getTokenAndSave().toPromise().then(
        user => {
          console.log({ user });
          const role = next.data.role;
          if (!role) {
            return true;
          }
          console.log(role);
          console.log(this.auth.hasRole(role));
          return this.auth.hasRole(role);
        }
      );
    }
  }

}
