import { Component, OnInit } from '@angular/core';
import { User } from 'src/Interfaces/User';
import { UserService } from '../user.service';
import { TerapijeService } from '../terapije.service';
import { IzvestajiService } from '../izvestaji.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  terapijeView: boolean = false;
  izvestajiView: boolean = false;
  korisnik: User = {
    id: 0,
    userName: '',
    password: '',
    contact: '',
    firstName: '',
    lastName: '',
    role: 0,
    birthDate: '',
  };
  terapije: any[] = [];
  izvestaji: any[] = [];
  terapeuti: any[] = [];
  pacijenti: any[] = [];

  constructor(
    private userService: UserService,
    private terapijeService: TerapijeService,
    private izvestajiService: IzvestajiService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.korisnik = this.userService.loggedUser;
      this.loadTerapije();
      this.loadIzvesaji();
    }
  }

  loadTerapije() {
    if (this.korisnik.role == 0) {
      this.terapijeService.getTerapijeByPacijent(this.korisnik.id).subscribe(
        (data) => {
          this.terapije = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.korisnik.role == 1) {
      this.terapijeService.getTerapijeByDoktor(this.korisnik.id).subscribe(
        (data) => {
          this.terapije = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  loadIzvesaji() {
    if (this.korisnik.role == 0) {
      this.izvestajiService.getIzvestajByPacijent(this.korisnik.id).subscribe(
        (data) => {
          this.izvestaji = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (this.korisnik.role == 1) {
      this.izvestajiService.getIzvestajByDoktor(this.korisnik.id).subscribe(
        (data) => {
          this.izvestaji = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  terapijeToggle() {
    this.terapijeView = !this.terapijeView;
  }

  izvestajiToggle() {
    console.log(this.pacijenti);
    this.izvestajiView = !this.izvestajiView;
  }
}
