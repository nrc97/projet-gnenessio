import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/etudiant.model';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  etudiants: Etudiant[] = [];
  annees: number[] = [2016, 2017, 2018, 2019, 2020, 2021];
  etudiantsSubscription: Subscription;
  constructor(private authService: AuthService, private adminService: AdminService,
    private router: Router) { }

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
  onEditMembre(etudiant: Etudiant) {
    this.adminService.selectedEtudiant = etudiant;
    this.router.navigate(['register/admin-edit']);
  }
  onDeleteMembre(etudiant: Etudiant) {
    this.adminService.deleteEtudiant(etudiant);
  }
  onCreateMembre() {
    this.router.navigate(['register/add']);
  }
  onChangePromotion($event) {
    this.adminService.getPromotion($event.value);
  }

}
