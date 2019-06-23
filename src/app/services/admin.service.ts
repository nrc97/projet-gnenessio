import { Injectable } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedEtudiant: Etudiant = new Etudiant();
  annees: number[] = [];
  etudiants: any = [];
  promotion: Etudiant[] = [];
  promotionSubject: Subject<Etudiant[]> = new Subject<Etudiant[]>();
  etudiantsSubject: Subject<Etudiant[]> = new Subject<Etudiant[]>();
  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }
  getPromotion(annee: number) {
    this.promotion = [];
    this.etudiants.forEach(element => {
      if (element.promotion === annee && Number(annee) !== 0) {
        this.promotion.push(element);
      } else if (Number(annee) === 0) {
        this.promotion.push(element);
      }
    });
    /*this.promotion.sort((a: Etudiant, b: Etudiant) => {
      let comparaison = 0;
      if (a.nom + ' ' + a.prenoms > b.nom + ' ' + b.prenoms) {
        comparaison = 1;
      } else if (a.nom + ' ' + a.prenoms < b.nom + ' ' + b.prenoms) {
        comparaison = -1;
      }
      return comparaison;
    });*/
    this.emitPromotion();
  }
  getEtudiants() {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8080/test/liste-mis').subscribe((data) => {
        this.etudiants = data;
        this.etudiants.sort((a: Etudiant, b: Etudiant) => {
          let comparaison = 0;
          if (a.nom + ' ' + a.prenoms > b.nom + ' ' + b.prenoms) {
            comparaison = 1;
          } else if (a.nom + ' ' + a.prenoms < b.nom + ' ' + b.prenoms) {
            comparaison = -1;
          }
          return comparaison;
        });
        this.etudiants.forEach(element => {
          if (!this.annees.includes(element.promotion)) {
            this.annees.push(element.promotion);
          }
        });
        this.annees.sort();
        this.annees.reverse();
        this.emitEtudiants();
        this.getPromotion(0);
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }
  register(etudiant: Etudiant, type: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8080/test/update-mis', JSON.stringify(etudiant)).subscribe(data => {
        if (data !== null) {
          console.log(data);
          const user: User = new User(etudiant.email, etudiant.password);
          if (etudiant.id === this.authService.etudiant.id && type === 'admin-edit') {
            this.authService.login(user).then(() => {
              this.router.navigate(['admin']);
              resolve();
            });
          } else {
            this.router.navigate(['admin']);
            resolve();
          }
        }
      }, error => {
        console.log(error);
        reject();
      });
    });
}
  addEtudiant(etudiant: Etudiant) {
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8080/test/update-mis', etudiant).subscribe((data) => {
        console.log(data);
        this.getEtudiants().then(() => {
          this.emitEtudiants();
          this.router.navigate(['admin']);
        });
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }
  deleteEtudiant(etudiant: Etudiant) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8080/test/delete-mis', JSON.stringify(etudiant)).subscribe((data) => {
        console.log(data);
        this.getEtudiants().then(() => {
          this.emitEtudiants();
          this.router.navigate(['admin']);
        });
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }
  updateEtudiant(etudiant: Etudiant) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8080/test/update-mis', JSON.stringify(etudiant)).subscribe((data) => {
        console.log(data);
        this.getEtudiants().then(() => {
          this.emitEtudiants();
          this.router.navigate(['admin']);
        });
        resolve();
      }, error => {
        console.log(error);
        reject();
      });
    });
  }
  emitEtudiants() {
    this.etudiantsSubject.next(this.etudiants);
  }
  emitPromotion() {
    this.promotionSubject.next(this.promotion);
  }
}
