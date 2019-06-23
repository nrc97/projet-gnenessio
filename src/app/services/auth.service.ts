import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  etudiant: any;
  erreur: any = '';
  emailOK = false;
  isAuthSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) {}
login(user: User) {
  return new Promise((resolve, reject) => {
    this.httpClient.post('http://localhost:8080/test/liste-mis', JSON.stringify(user)).subscribe(data => {
      if (data !== null && data !== 'mot de passe incorrect' && data !== 'cet utilisateur n\'existe pas encore') {
        try {
          this.etudiant = data;
          console.log(this.etudiant.id, ' bien chargé');
          this.isAuth = true;
          this.erreur = '';
          this.router.navigate(['profil']);
          this.emitIsAuth();
          resolve();
        } catch (error) {
          console.log(error);
          reject();
        }
      } else {
        this.erreur = data;
      }
    }, error => {
      reject(error);
      this.erreur = {message: 'serveur indisponible'};
    });
  });

  }
  emitIsAuth() {
    this.isAuthSubject.next(this.isAuth);
  }
  logout() {
    this.isAuth = false;
    this.emitIsAuth();
    this.etudiant = null;
    this.erreur = '';
  }
  register(etudiant: Etudiant, type: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8080/test/update-mis', JSON.stringify(etudiant)).subscribe(data => {
        if (data !== null) {
          console.log(data);
          const user: User = new User(etudiant.email, etudiant.password);
          this.login(user).then(() => {
            this.router.navigate(['profil']);
            resolve();
          });
        }
      }, error => {
        console.log(error);
        reject();
      });
    });
}
}
