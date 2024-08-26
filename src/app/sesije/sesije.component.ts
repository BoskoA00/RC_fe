import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SesijeService } from '../sesije.service';
import { TerapijeService } from '../terapije.service';

@Component({
  selector: 'app-sesije',
  templateUrl: './sesije.component.html',
  styleUrls: ['./sesije.component.css'],
})
export class SesijeComponent implements OnInit {
  role: number = 0;
  sesije: any[] = [];
  filteredSesije: any[] = [];
  search: boolean = false;
  searchTerm: string = '';
  constructor(
    private userService: UserService,
    private sesijeService: SesijeService,
    private terapijaService: TerapijeService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.loadSesije();
    }
  }

  loadSesije() {
    if (this.role == 0 && this.userService.loggedUser) {
      this.sesijeService
        .getSesijaByIdPacijenta(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.sesije = data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.role == 1 && this.userService.loggedUser) {
      this.sesijeService
        .getSesijaByIDDoktor(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.sesije = data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.role == 2) {
      this.sesijeService.getAll().subscribe(
        (data) => {
          this.sesije = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteSesija(id: number): void {
    let t: any = [];
    let sesija = this.sesije.find((s) => s.id === id);
    this.terapijaService
      .getTerapijaById(sesija.idTerapije)
      .subscribe((data) => {
        t.id = sesija.idTerapije;
        t.sifra = data.sifra;
        t.datumPocetka = data.datumPocetka;
        t.datumKraja = data.datumKraja;
        t.sadrzaj = data.sadrzaj;
        t.brojSesija = data.brojSesija;
        t.brojSesija = t.brojSesija - 1;
        this.terapijaService
          .updateTerapija({
            id: t.id,
            sifra: t.sifra,
            datumPocetka: t.datumPocetka,
            datumKraja: t.datumKraja,
            sadrzaj: t.sadrzaj,
            brojSesija: t.brojSesija,
          })
          .subscribe(
            (response) => {
              this.loadSesije();
            },
            (err) => {}
          );
      });
    this.sesijeService.deleteSesija(id).subscribe((data) => {});
  }
  changeSearch() {
    this.search = false;
    if (this.searchTerm.trim().length > 0) {
      this.search = true;
      this.filteredSesije = this.sesije.filter((sesija) =>
        sesija.terapija.sifra
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.search = false;
      this.filteredSesije = [];
    }
  }
}
