import { Component, OnInit } from '@angular/core';
import { OpremaService } from '../oprema.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SobeService } from '../sobe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-oprema',
  templateUrl: './add-oprema.component.html',
  styleUrls: ['./add-oprema.component.css'],
})
export class AddOpremaComponent implements OnInit {
  minDate: string = '';
  sifra: string = '';
  naziv: string = '';
  brojSobe: string = '';
  proveraSifre: boolean = false;
  proveraSobe: boolean = false;
  proveraZauzetostiSobe: boolean = false;
  poslednjeOdrzavanje: string = '';
  idSobe: number = 0;
  sobe: any[] = [];
  constructor(
    private opremaService: OpremaService,
    private sobaService: SobeService,
    private router: Router
  ) {}
  addOpremaForm = new FormGroup({
    sifra: new FormControl('', [Validators.required]),
    naziv: new FormControl('', [Validators.required]),
    brojSobe: new FormControl('', [Validators.required]),
    datumPoslednjegOdrzavaja: new FormControl(''),
  });
  get Naziv() {
    return (
      (this.addOpremaForm.get('naziv') as FormControl) ?? new FormControl()
    );
  }
  get Sifra() {
    return (
      (this.addOpremaForm.get('sifra') as FormControl) ?? new FormControl()
    );
  }
  get BrojSobe() {
    return (
      (this.addOpremaForm.get('brojSobe') as FormControl) ?? new FormControl()
    );
  }
  get DatumPoslednjegOdrzavaja() {
    return (
      (this.addOpremaForm.get('datumPoslednjegOdrzavaja') as FormControl) ??
      new FormControl()
    );
  }
  ngOnInit(): void {
    this.setMinDate();
    this.sobaService.getAll().subscribe((data) => {
      this.sobe = data;
    });
  }
  setMinDate() {
    const today = new Date();
    let day = today.getDate().toString().padStart(2, '0');
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }
  dodajOpremu() {
    const data = {
      naziv: this.naziv,
      sifra: this.sifra,
      idSobe: this.idSobe,
      poslednjeOdrzavanje: this.formatDate(this.poslednjeOdrzavanje),
    };
    if (
      this.proveraSifre == false &&
      this.proveraSobe == false &&
      this.proveraZauzetostiSobe == false &&
      this.addOpremaForm.valid
    ) {
      this.opremaService.createOprema(data).subscribe(
        (d) => {
          this.router.navigate(['oprema']);
        },
        (err) => {
          console.log(err);
        }
      );
      this.addOpremaForm.reset();
      this.sifra = '';
      this.naziv = '';
      this.brojSobe = '';
      this.poslednjeOdrzavanje = '';
      this.proveraSifre = false;
      this.proveraSobe = false;
      this.proveraZauzetostiSobe = false;
    }
  }
  formatDate(date: string): string {
    const d = new Date(date);
    let day = d.getDate().toString().padStart(2, '0');
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  checkSifra() {
    this.proveraSifre = false;
    if (this.sifra.trim().length > 0) {
      this.opremaService.checkSifra(this.sifra).subscribe(
        (data) => {
          this.proveraSifre = data;
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
      this.opremaService.getOpremaBySobaBr(this.sifra).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.proveraSifre = false;
    }
  }
  checkSoba() {
    this.proveraSobe = false;
    this.proveraZauzetostiSobe = false;
    if (this.brojSobe.trim().length > 0) {
      this.sobaService.getSobaByBrojSobe(this.brojSobe).subscribe(
        (data) => {
          if (data == null) {
            this.proveraSobe = true;
            return;
          } else {
            if (data.oprema != null) {
              this.proveraZauzetostiSobe = true;
              return;
            }
            this.idSobe = data.id;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
