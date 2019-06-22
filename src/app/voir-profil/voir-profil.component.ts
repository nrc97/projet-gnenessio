import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Etudiant } from '../models/etudiant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voir-profil',
  templateUrl: './voir-profil.component.html',
  styleUrls: ['./voir-profil.component.css']
})
export class VoirProfilComponent implements OnInit {
  etudiant: Etudiant = new Etudiant();
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.etudiant = this.adminService.selectedEtudiant;
  }

}
