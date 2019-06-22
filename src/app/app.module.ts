import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatExpansionModule, MatIconModule, MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { AuthComponent } from './auth/auth.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListeComponent } from './liste/liste.component';
import { VoirProfilComponent } from './voir-profil/voir-profil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfilComponent,
    AdminComponent,
    HeaderComponent,
    RegisterComponent,
    ListeComponent,
    VoirProfilComponent,
    FourOhFourComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
