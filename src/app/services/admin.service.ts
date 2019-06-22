import { Injectable } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  constructor(private httpClient: HttpClient, private router: Router) { }
  getPromotion(annee: number) {
    this.promotion = [];
    if (annee !== 0) {
      this.etudiants.forEach(element => {
        if (element.promotion === annee) {
          this.promotion.push(element);
        }
      });
    } else {
      this.promotion = this.etudiants.slice();
    }
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
