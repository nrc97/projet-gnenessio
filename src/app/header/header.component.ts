import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Etudiant } from '../models/etudiant.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  etudiant: Etudiant;
  etudiantSubscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.etudiant = new Etudiant();
    this.etudiant.type = 'sm';
    this.etudiantSubscription = this.authService.isAuthSubject.subscribe(data => {
      this.etudiant = this.authService.etudiant;
    });
  }
  ngOnDestroy() {
    this.etudiantSubscription.unsubscribe();
  }

}
