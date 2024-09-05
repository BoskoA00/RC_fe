import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TerapijeService } from '../terapije.service';
import { SesijeService } from '../sesije.service';
import { UserService } from '../user.service';
import { SobeService } from '../sobe.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-terapije',
  templateUrl: './edit-terapije.component.html',
  styleUrls: ['./edit-terapije.component.css'],
})
export class EditTerapijeComponent implements OnInit {
  datumKrajaCheck: boolean = false;
  datumPocetkaCheck: boolean = false;
  terapijaId: number = 0;
  terapijaSadrzaj: string = '';
  terapijaSifra: string = '';
  terapijaDatumPocetka: string = '';
  terapijaDatumKraja: string = '';
  pacijent: string = '';
  brojSesija: number = 0;
  sesije: any[] = [];
  role: number = 0;
  noveSesije: any[] = [];
  sobe: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private terapijaServ: TerapijeService,
    private sesijeServ: SesijeService,
    private userServ: UserService,
    private sobeServ: SobeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.terapijaId = +(params.get('id') ?? '0');
    });
    this.loadTerapija();
    this.loadSesija();
    this.loadSobe();
    if (this.userServ.loggedUser) {
      this.role = this.userServ.loggedUser.role;
    }
  }

  loadSobe(): void {
    this.sobeServ.getAll().subscribe(
      (data) => {
        this.sobe = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadTerapija(): void {
    this.terapijaServ.getTerapijaById(this.terapijaId).subscribe((data) => {
      this.terapijaSadrzaj = data.content;
      this.terapijaSifra = data.code;
      this.terapijaDatumPocetka = data.startDate;
      this.terapijaDatumKraja = data.endDate;
      this.pacijent = data.patient.firstName + ' ' + data.patient.lastName;
    });
  }

  loadSesija(): void {
    this.sesijeServ.getSesijaByTerapijaId(this.terapijaId).subscribe(
      (data) => {
        this.sesije = data;
        this.brojSesija = data.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateTerapija(): void {
    this.datumPocetkaCheck = false;
    this.datumKrajaCheck = false;

    if (
      this.terapijaSadrzaj.trim() === '' ||
      this.terapijaSadrzaj == 'Mora imati sadrzaj'
    ) {
      this.terapijaSadrzaj = 'Mora imati sadrzaj';
      return;
    }
    let d1 = parseInt(this.terapijaDatumPocetka.substring(0, 2), 10);
    let d2 = parseInt(this.terapijaDatumPocetka.substring(3, 5), 10);
    let d3 = parseInt(this.terapijaDatumPocetka.substring(6, 10), 10);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    if (d3 < currentYear) {
      this.datumPocetkaCheck = true;
      return;
    }

    if (d3 === currentYear) {
      if (d2 < currentMonth) {
        this.datumPocetkaCheck = true;

        return;
      }

      if (d2 === currentMonth && d1 < currentDay) {
        this.datumPocetkaCheck = true;
        return;
      }
    }
    let d1End = parseInt(this.terapijaDatumKraja.substring(0, 2), 10);
    let d2End = parseInt(this.terapijaDatumKraja.substring(3, 5), 10);
    let d3End = parseInt(this.terapijaDatumKraja.substring(6, 10), 10);

    if (
      d3End < d3 ||
      (d3End === d3 && d2End < d2) ||
      (d3End === d3 && d2End === d2 && d1End < d1)
    ) {
      this.datumKrajaCheck = true;
      return;
    }
    let sobeCheck = false;
    let terminiCheck = false;
    this.noveSesije.forEach((ns) => {
      if (ns.sobaNePostoji) {
        sobeCheck = true;
      }
      if (ns.terminNeispravan) {
        terminiCheck = true;
      }
    });

    if (
      !this.datumKrajaCheck &&
      !this.datumPocetkaCheck &&
      !sobeCheck &&
      !terminiCheck
    ) {
      this.terapijaServ
        .updateTerapija({
          id: this.terapijaId,
          code: this.terapijaSifra,
          startDate: this.terapijaDatumPocetka,
          endDate: this.terapijaDatumKraja,
          content: this.terapijaSadrzaj,
          sessionsNumber: this.brojSesija,
        })
        .subscribe(
          (data) => {
            if (this.noveSesije.length <= 0) {
              this.router.navigate(['terapije']);
            } else {
              this.noveSesije.forEach((ns) => {
                this.sesijeServ
                  .createSesija({
                    idSobe: ns.idSobe,
                    idTerapije: ns.idTerapije,
                    termin: ns.termin,
                  })
                  .subscribe(
                    (data) => {},
                    (err) => {
                      console.log(err);
                    }
                  );
              });
              this.router.navigate(['terapije']);
            }
          },
          (err) => {
            console.log(err);
            return;
          }
        );
    }
  }

  deleteSesija(id: number): void {
    let t: any = {};

    this.terapijaServ.getTerapijaById(this.terapijaId).subscribe((data) => {
      this.brojSesija = this.brojSesija - 1;

      t.id = this.terapijaId;
      t.sifra = data.code;
      t.datumPocetka = data.startDate;
      t.datumKraja = data.endDate;
      t.sadrzaj = data.content;
      t.brojSesija = this.brojSesija;

      this.terapijaServ
        .updateTerapija({
          id: t.id,
          code: t.sifra,
          startDate: t.datumPocetka,
          endDate: t.datumKraja,
          content: t.sadrzaj,
          sessionsNumber: t.brojSesija,
        })
        .subscribe(
          (response) => {},
          (err) => {}
        );
    });
    this.sesijeServ.deleteSesija(id).subscribe((data) => {
      this.loadSesija();
    });
  }
  dodajSesiju(): void {
    let sesija = {
      id: this.noveSesije.length,
      brojSobe: '',
      idSobe: 0,
      idTerapije: this.terapijaId,
      termin: '',
      sobaNePostoji: false,
      terminNeispravan: false,
    };
    this.noveSesije.push(sesija);
    this.brojSesija = this.brojSesija + 1;
  }
  removeNewSesija(id: number): void {
    this.noveSesije = this.noveSesije.filter((s) => s.id !== id);
    this.brojSesija = this.brojSesija - 1;
  }
  inputDatumPocetka(): void {
    this.datumPocetkaCheck = false;
    if (this.terapijaDatumPocetka.length == 2) {
      this.terapijaDatumPocetka += '-';
    }
    if (this.terapijaDatumPocetka.length == 5) {
      this.terapijaDatumPocetka += '-';
    }
  }
  inputDatumKraja(): void {
    this.datumPocetkaCheck = false;
    if (this.terapijaDatumPocetka.length == 2) {
      this.terapijaDatumPocetka += '-';
    }
    if (this.terapijaDatumPocetka.length == 5) {
      this.terapijaDatumPocetka += '-';
    }
  }
  deleteTerapija(): void {
    this.terapijaServ.deleteTerapija(this.terapijaId).subscribe(
      (data) => {
        this.router.navigate(['terapije']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  checkSoba(id: number) {
    this.noveSesije[id].sobaNePostoji = false;
    let brSobe = this.noveSesije[id].brojSobe;
    this.sobeServ.getSobaByBrojSobe(brSobe).subscribe(
      (data) => {
        if (data === null) {
          this.noveSesije[id].sobaNePostoji = true;
        } else {
          this.noveSesije[id].sobaNePostoji = false;
          this.noveSesije[id].idSobe = data.id;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  checkTermin(id: number) {
    this.noveSesije[id].termin = this.noveSesije[id].termin.trim();
    const termin = this.noveSesije[id].termin;
    this.noveSesije[id].terminNeispravan = false;
    if (this.noveSesije[id].termin.trim().length === 0) {
      this.noveSesije[id].terminNeispravan = false;
      return;
    }
    if (
      this.noveSesije[id].termin.length === 2 ||
      this.noveSesije[id].termin.length === 5
    ) {
      this.noveSesije[id].termin += '-';
    }
    if (this.noveSesije[id].termin.length === 10) {
      this.noveSesije[id].termin += '--';
    }
    if (this.noveSesije[id].termin.length === 14) {
      this.noveSesije[id].termin += ':';
    }

    const regex = /^\d{2}-\d{2}-\d{4}--\d{2}:\d{2}$/;
    if (!regex.test(termin)) {
      this.noveSesije[id].terminNeispravan = true;

      return;
    }

    const [day, month, year, hour, minute] = [
      parseInt(termin.substring(0, 2), 10),
      parseInt(termin.substring(3, 5), 10),
      parseInt(termin.substring(6, 10), 10),
      parseInt(termin.substring(12, 14), 10),
      parseInt(termin.substring(15, 17), 10),
    ];

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      this.noveSesije[id].terminNeispravan = true;
      return;
    }

    const [startDay, startMonth, startYear] = [
      parseInt(this.terapijaDatumPocetka.substring(0, 2), 10),
      parseInt(this.terapijaDatumPocetka.substring(3, 5), 10),
      parseInt(this.terapijaDatumPocetka.substring(6, 10), 10),
    ];

    const [endDay, endMonth, endYear] = [
      parseInt(this.terapijaDatumKraja.substring(0, 2), 10),
      parseInt(this.terapijaDatumKraja.substring(3, 5), 10),
      parseInt(this.terapijaDatumKraja.substring(6, 10), 10),
    ];

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    const sessionDate = new Date(year, month - 1, day, hour, minute);

    if (sessionDate <= startDate || sessionDate >= endDate) {
      this.noveSesije[id].terminNeispravan = true;
      return;
    }
    const startHour = 8;
    const endHour = 16;
    if (
      hour < startHour ||
      hour > endHour ||
      (hour === endHour && minute > 0)
    ) {
      this.noveSesije[id].terminNeispravan = true;
      return;
    }
  }
}
