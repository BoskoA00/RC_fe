import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { LoginGuard } from './login.guard';
import { IzvestajiComponent } from './izvestaji/izvestaji.component';
import { AuthGuard } from './auth.guard';
import { LoggedGuard } from './logged.guard';
import { TerapijeComponent } from './terapije/terapije.component';
import { EditTerapijeComponent } from './edit-terapije/edit-terapije.component';
import { EditIzvestajiComponent } from './edit-izvestaji/edit-izvestaji.component';
import { IzvestajComponent } from './izvestaj/izvestaj.component';
import { TerapijaComponent } from './terapija/terapija.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SesijeComponent } from './sesije/sesije.component';
import { AddTerapijeComponent } from './add-terapije/add-terapije.component';
import { AddSobaComponent } from './add-soba/add-soba.component';
import { AddOpremaComponent } from './add-oprema/add-oprema.component';
import { EditOpremaComponent } from './edit-oprema/edit-oprema.component';
import { AddIzvestajComponent } from './add-izvestaj/add-izvestaj.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolePipe } from './role.pipe';
import { IzvestajPipe } from './izvestaj.pipe';
import { DatumPipe } from './datum.pipe';
import { VremePipe } from './vreme.pipe';
import { PacijentiComponent } from './pacijenti/pacijenti.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { SesijaTerminPipe } from './sesija-termin.pipe';
import { SobeComponent } from './sobe/sobe.component';
import { OpremaComponent } from './oprema/oprema.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { StatusSobePipe } from './status-sobe.pipe';
import { DoctorGuardGuard } from './doctor-guard.guard';
import { AdminGuardGuard } from './admin-guard.guard';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    EditTerapijeComponent,
    EditIzvestajiComponent,
    ErrorComponent,
    ProfilComponent,
    SesijeComponent,
    AddTerapijeComponent,
    AddSobaComponent,
    AddOpremaComponent,
    EditOpremaComponent,
    AddIzvestajComponent,
    RolePipe,
    IzvestajiComponent,
    IzvestajPipe,
    IzvestajComponent,
    DatumPipe,
    TerapijeComponent,
    TerapijaComponent,
    SesijeComponent,
    PacijentiComponent,
    PacijentComponent,
    VremePipe,
    NavBarComponent,
    PacijentiComponent,
    PacijentComponent,
    SesijaTerminPipe,
    SobeComponent,
    OpremaComponent,
    KorisniciComponent,
    StatusSobePipe,
    ChatComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, canActivate: [LoggedGuard] },

      { path: 'profil', component: ProfilComponent, canActivate: [LoginGuard] },
      {
        path: 'izvestaji',
        component: IzvestajiComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'terapije',
        component: TerapijeComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'editIzvestaji/:id',
        component: EditIzvestajiComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'editTerapija/:id',
        component: EditTerapijeComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'addTerapije',
        component: AddTerapijeComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'addSoba',
        component: AddSobaComponent,
        canActivate: [LoginGuard, AdminGuardGuard],
      },
      {
        path: 'addIzvestaj',
        component: AddIzvestajComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'addOprema',
        component: AddOpremaComponent,
        canActivate: [LoginGuard, AdminGuardGuard],
      },
      {
        path: 'izvestaj/:id',
        component: IzvestajComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'terapija/:id',
        component: TerapijaComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'editOprema/:id',
        component: EditOpremaComponent,
        canActivate: [LoginGuard, AdminGuardGuard],
      },
      {
        path: 'sesije',
        component: SesijeComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'pacijenti',
        component: PacijentiComponent,
        canActivate: [LoginGuard, AdminGuardGuard],
      },
      {
        path: 'drugiProfil/:id',
        component: PacijentComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'korisnici',
        component: KorisniciComponent,
        canActivate: [LoginGuard, AdminGuardGuard],
      },
      {
        path: 'oprema',
        component: OpremaComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: 'sobe',
        component: SobeComponent,
        canActivate: [LoginGuard, AuthGuard],
      },
      {
        path: '**',
        component: ErrorComponent,
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
