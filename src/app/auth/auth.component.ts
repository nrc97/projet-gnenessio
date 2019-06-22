import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isAuth = false;
  authForm: FormGroup;
  etudiant: Etudiant;
  isAuthSubscription: Subscription;
  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(data => {
      this.isAuth = data;
      this.etudiant = this.authService.etudiant;
    });
    this.authService.emitIsAuth();
  }
  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
    const formValue = this.authForm.value;
    //this.authForm.get('email').setValue('nakouban.camara@inphb.ci');
    //this.authForm.get('password').setValue('nakoubanpw');
  }
  authenticate() {
    const formValue = this.authForm.value;
    const user: User = new User(formValue['email'], formValue['password']);
    if (!this.isAuth) {
      this.authService.login(user);
    } else {
      this.authService.logout();
    }
  }
}
