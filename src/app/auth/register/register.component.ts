import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Route, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  titre = 'Ajouter un MIS';
  etudiant = new Etudiant();
  type = '';
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private adminService: AdminService) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.type === 'add') {
      this.titre = 'Ajout d\'un nouveau MIS';
    } else if (this.type === 'edit') {
      this.titre = 'Modification de mon profil';
      this.etudiant = this.authService.etudiant;
    } else if (this.type === 'admin-edit') {
      this.titre = 'Modification d\'un MIS';
      this.etudiant = this.adminService.selectedEtudiant;
    }
    this.initForm();
  }
  onRegister() {
    const formValue = this.registerForm.value;
    const nom = formValue['nom'];
    const prenoms = formValue['prenoms'];
    const email = formValue['email'];
    const password = formValue['password'];
    const promotion = formValue['promotion'];
    const telephone = formValue['telephone'];
    const type = formValue['type'];
    const entreprise = formValue['entreprise'];
    const poste = formValue['poste'];
    const etudiant = new Etudiant();
    etudiant.id = this.etudiant.id;
    etudiant.nom = nom;
    etudiant.prenoms = prenoms;
    etudiant.email = email;
    etudiant.password = password;
    etudiant.promotion = promotion;
    etudiant.telephone = telephone;
    etudiant.type = type;
    etudiant.entreprise = entreprise;
    etudiant.poste = poste;
    this.authService.register(etudiant, this.type);
  }
  initForm() {
    const date = new Date();
    this.registerForm = this.formBuilder.group({
      nom: [this.etudiant.nom, [Validators.required]],
      prenoms: [this.etudiant.prenoms, [Validators.required]],
      email: [this.etudiant.email, [Validators.required, Validators.email]],
      password: [this.etudiant.password, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      promotion: [this.etudiant.promotion, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      telephone: [this.etudiant.telephone, [Validators.required]],
      type: [this.etudiant.type, [Validators.required]],
      entreprise: [this.etudiant.entreprise, []],
      poste: [this.etudiant.poste, []]
    });
  }

  onCancel() {
    this.router.navigate(['admin']);
  }

}
