import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Etudiant } from '../models/etudiant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  etudiant: Etudiant = new Etudiant();
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.etudiant = this.authService.etudiant;
  }
  onEditProfil() {
    this.router.navigate(['register/edit']);
  }
}
