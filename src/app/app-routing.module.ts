import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './auth/register/register.component';
import { ListeComponent } from './liste/liste.component';
import { VoirProfilComponent } from './voir-profil/voir-profil.component';
import { AdminGuardService } from './services/admin-guard.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent},
  {path: 'admin',  canActivate: [AuthGuardService, AdminGuardService], component: AdminComponent},
  {path: 'register/:type', canActivate: [AuthGuardService], component: RegisterComponent},
  {path: 'register/add', canActivate: [AdminGuardService], component: RegisterComponent},
  {path: 'liste', component: ListeComponent},
  {path: 'mis-profil', component: VoirProfilComponent },
  {path: '', component: AuthComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
