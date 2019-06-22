import { Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;
  isAuth = false;
  etudiant: Etudiant = new Etudiant();
  userSubscription: Subscription = this.authService.isAuthSubject.subscribe(data => {
    this.etudiant = this.authService.etudiant;
  }
  );
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    this.authService.emitIsAuth();
    return new Promise(
      (resolve, reject) => {
            if (this.etudiant.type === 'mg') {
              resolve(true);
            } else {
              this.router.navigate(['/auth']);
              resolve(false);
            }
          }
        );
  }
}
