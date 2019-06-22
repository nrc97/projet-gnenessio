import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
  isAuth = false;
  userSubscription: Subscription = this.authService.isAuthSubject.subscribe(data => {
    this.isAuth = data;
  }
  );
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    this.authService.emitIsAuth();
    return new Promise(
      (resolve, reject) => {
            if (this.isAuth) {
              resolve(true);
            } else {
              this.router.navigate(['/auth']);
              resolve(false);
            }
          }
        );
  }
}
