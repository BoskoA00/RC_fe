import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IzvestajiService } from '../izvestaji.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-izvestaj',
  templateUrl: './add-izvestaj.component.html',
  styleUrls: ['./add-izvestaj.component.css'],
})
export class AddIzvestajComponent implements OnInit {
  sifra: string = '';
  idDoktor: number = 0;
  idPacijenta: string = '0';
  sadrzaj: string = '';
  imePacijenta: string = '';
  pacijenti: any[] = [];
  sifraZauzeta: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private izvestajService: IzvestajiService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.idDoktor = this.userService.loggedUser.id;
      this.loadPacijenti();
    }
  }
  formaIzvestaj = new FormGroup({
    sifra: new FormControl('', [Validators.required]),
    idPacijenta: new FormControl('', [Validators.required]),
    sadrzaj: new FormControl('', [Validators.required]),
  });
  loadPacijenti() {
    this.userService.getUsersByRole(0).subscribe(
      (data) => {
        this.pacijenti = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get Sifra() {
    return (
      (this.formaIzvestaj.get('sifra') as FormControl) ?? new FormControl()
    );
  }
  get GidPacijenta() {
    return (
      (this.formaIzvestaj.get('idPacijenta') as FormControl) ??
      new FormControl()
    );
  }
  get Sadrzaj() {
    return (
      (this.formaIzvestaj.get('sadrzaj') as FormControl) ?? new FormControl()
    );
  }
  selekcijaPacijenta() {
    const crta = this.imePacijenta.indexOf('-');
    this.idPacijenta = this.imePacijenta.substring(0, crta);
  }
  proveraSifre() {
    this.sifraZauzeta = false;
    if (this.sifra.trim().length > 0) {
      this.izvestajService.getIzvestajByCode(this.sifra).subscribe(
        (data) => {
          if (data != null) {
            this.sifraZauzeta = true;
          } else {
            this.sifraZauzeta = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  addIzvestaj() {
    if (this.formaIzvestaj.valid && this.sifraZauzeta == false) {
      const vremeStvaranja = new Date();
      const formattedDate =
        ('0' + vremeStvaranja.getDate()).slice(-2) +
        '-' +
        ('0' + (vremeStvaranja.getMonth() + 1)).slice(-2) +
        '-' +
        vremeStvaranja.getFullYear();

      const data = {
        sifra: this.sifra,
        idDoktora: this.idDoktor,
        idPacijenta: this.idPacijenta,
        sadrzaj: this.sadrzaj,
        vremeStvaranja: formattedDate,
      };

      this.izvestajService.createIzvestaj(data).subscribe(
        (d) => {
          this.router.navigate(['izvestaji']);
        },
        (err) => {}
      );
    }
  }
}
