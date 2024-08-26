import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { TerapijeService } from '../terapije.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SobeService } from '../sobe.service';
import { SesijeService } from '../sesije.service';
@Component({
  selector: 'app-add-terapije',
  templateUrl: './add-terapije.component.html',
  styleUrls: ['./add-terapije.component.css'],
})
export class AddTerapijeComponent implements OnInit {
  minDate: string = '';
  sadrzaj: string = '';
  sifra: string = '';
  idDoktora: number = 0;
  idPacijenta: string = '0';
  imePacijenta: string = '0';
  pacijenti: any[] = [];
  sifraZauzeta: boolean = false;
  datumKraja: string = '';
  datumPocetka: string = '';
  brojSesija: number = 0;
  sesije: any[] = [];
  sobe: any[] = [];
  dodajSesije: boolean = false;
  idTerapije: number = 0;
  uploadSesije: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private terapijeService: TerapijeService,
    private sobeService: SobeService,
    private sesijeService: SesijeService
  ) {
    this.minDate = this.getTomorrowDate();
  }
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
  removeSesija(i: number) {
    this.sesije.splice(i, 1);
    this.brojSesija = this.brojSesija - 1;
    if (this.brojSesija == 0) {
      this.uploadSesije = false;
    }
  }
  addSesije() {
    this.sesije.push({
      idTerapije: 0,
      brojSobe: '',
      idSobe: 0,
      datum: '',
      vreme: '',
      sobaCheck: false,
      vremeCheck: false,
      datumCheck: false,
    });
    this.brojSesija = this.brojSesija + 1;
  }
  sesijeChange() {
    this.sesije = [];
    for (let index = 0; index < this.BrojSesija.value; index++) {
      this.sesije.push({
        idTerapije: 0,
        brojSobe: '',
        idSobe: 0,
        datum: '',
        vreme: '',
        sobaCheck: false,
      });
    }
    if (this.brojSesija > 0) {
      this.dodajSesije = true;
    }
  }
  proveraSifre() {
    this.sifraZauzeta = false;
    this.terapijeService.getTerapijaByCode(this.sifra).subscribe((data) => {
      if (data != null) {
        this.sifraZauzeta = true;
      } else {
        this.sifraZauzeta = false;
      }
    });
  }
  formaTerapije = new FormGroup({
    sifra: new FormControl('', [Validators.required]),
    imePacijenta: new FormControl('', [Validators.required]),
    datumKraja: new FormControl('', [Validators.required]),
    datumPocetka: new FormControl('', [Validators.required]),
    brojSesija: new FormControl('', [Validators.required]),
    sadrzaj: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.idDoktora = this.userService.loggedUser.id;
      this.loadPacijenti();
      this.loadSobe();
    }
  }
  get Sifra() {
    return (
      (this.formaTerapije.get('sifra') as FormControl) ?? new FormControl()
    );
  }
  get ImePacijenta() {
    return (
      (this.formaTerapije.get('imePacijenta') as FormControl) ??
      new FormControl()
    );
  }
  get BrojSesija() {
    return (
      (this.formaTerapije.get('brojSesija') as FormControl) ?? new FormControl()
    );
  }
  loadSobe() {
    this.sobeService.getAll().subscribe(
      (data) => {
        this.sobe = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  SelekcijaPacijenta() {
    const crta = this.imePacijenta.indexOf('-');
    this.idPacijenta = this.imePacijenta.substring(0, crta);
  }
  addTerapija() {
    if (this.formaTerapije.valid && this.sifraZauzeta == false) {
      const formattedDatumPocetka = this.formatDateToDDMMYYYY(
        this.datumPocetka
      );
      const formattedDatumKraja = this.formatDateToDDMMYYYY(this.datumKraja);

      const data = {
        sifra: this.sifra,
        idDoktora: this.idDoktora,
        idPacijenta: parseInt(this.idPacijenta),
        datumPocetka: formattedDatumPocetka,
        datumKraja: formattedDatumKraja,
        brojSesija: this.brojSesija,
        sadrzaj: this.sadrzaj,
      };

      this.terapijeService.createTerapija(data).subscribe(
        (data) => {
          if (this.brojSesija == 0) {
            this.uploadSesije = false;
          } else if (this.brojSesija > 0) {
            this.uploadSesije = true;
          }
          this.dodajSesije = true;
          this.idTerapije = data.id;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  formatDateToDDMMYYYY(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
  promenaSobe(i: number) {
    this.sesije[i].sobaCheck = false;
    let soba = this.sesije[i].brojSobe;
    this.sobeService.getSobaByBrojSobe(soba).subscribe((data) => {
      if (data) {
        this.sesije[i].idSobe = data.id;
        this.sesije[i].sobaCheck = false;
      } else if (data == null) {
        this.sesije[i].sobaCheck = true;
        this.sesije[i].idSobe = 0;
      }
    });
  }
  getTomorrowDate(): string {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const year = tomorrow.getFullYear();
    return `${year}-${month}-${day}`;
  }
  promenaVremena(i: number) {
    let vreme = this.sesije[i].vreme.trim();

    if (vreme.length === 2 && vreme.indexOf(':') === -1) {
      this.sesije[i].vreme = vreme + ':';
    }
  }
  vremeCheck(i: number) {
    this.sesije[i].vremeCheck = false;
    let vreme = this.sesije[i].vreme.trim();
    let h = vreme.substring(0, 2);
    let m = vreme.substring(3, 5);
    if (h <= 8 || h >= 15) {
      h = '08';
    }
    if (m < 1 || m > 59) {
      m = '00';
    }
    this.sesije[i].vreme = h + ':' + m;
  }
  SesijeUpload(): void {
    let vremeCheck = false;
    let datumCheck = false;
    let sobaCheck = false;
    this.sesije.forEach((s) => {
      let d3 = s.datum.substring(0, 4);
      let d2 = s.datum.substring(5, 7);
      let d1 = s.datum.substring(8, 10);

      if (s.datum.trim() === '' && s.datumCheck == false) {
        datumCheck = true;
        s.datumCheck = true;
      }
      if (s.vreme.trim() === '' && s.vremeCheck == false) {
        vremeCheck = true;
        s.vremeCheck = true;
      }
      if (s.brojSobe.trim() === '' && s.sobaCheck == false) {
        sobaCheck = true;
        s.sobaCheck = true;
      }
      if (s.sobaCheck === true) {
        sobaCheck = true;
      }
      if (s.vremeCheck === true) {
        vremeCheck = true;
      }
      if (s.datumCheck === true) {
        datumCheck = true;
      }
    });

    if (datumCheck) {
      return;
    }
    if (vremeCheck) {
      return;
    }
    if (sobaCheck) {
      return;
    }
    this.sesije.forEach((sesija) => {
      let d3 = sesija.datum.substring(0, 4);
      let d2 = sesija.datum.substring(5, 7);
      let d1 = sesija.datum.substring(8, 10);
      this.sesijeService
        .createSesija({
          idSobe: sesija.idSobe,
          idTerapije: this.idTerapije,
          termin: d1 + '-' + d2 + '-' + d3 + '--' + sesija.vreme,
        })
        .subscribe(
          (data) => {
            this.uploadSesije = false;
            this.dodajSesije = false;
          },
          (err) => {
            console.log(err);
          }
        );
    });
    this.router.navigate(['terapije']);
  }
}
