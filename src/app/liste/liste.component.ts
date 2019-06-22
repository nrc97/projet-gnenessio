import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  etudiants: Etudiant[] = [];
  annees: number[] = [2016, 2017, 2018, 2019, 2020, 2021];
  etudiantsSubscription: Subscription;
  constructor(private authService: AuthService, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.etudiantsSubscription = this.adminService.promotionSubject.subscribe(data => {
      this.etudiants = data;
    });
    this.adminService.getEtudiants().then(() => {
      this.annees = this.adminService.annees;
      this.etudiants = this.adminService.etudiants;
      this.adminService.emitPromotion();
    });
  }
  onChangePromotion($event) {
    this.adminService.getPromotion($event.value);
  }
  onLoadDescription(etudiant: Etudiant) {
    this.adminService.selectedEtudiant = etudiant;
    this.router.navigate(['mis-profil']);
  }

}
