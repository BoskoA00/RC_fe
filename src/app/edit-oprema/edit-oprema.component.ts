import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpremaService } from '../oprema.service';
import { SobeService } from '../sobe.service';

@Component({
  selector: 'app-edit-oprema',
  templateUrl: './edit-oprema.component.html',
  styleUrls: ['./edit-oprema.component.css'],
})
export class EditOpremaComponent implements OnInit {
  opremaId: number = 0;
  opremaSifra: string = '';
  opremaNaziv: string = '';
  brojSobe: string = '';
  datumPoslednjegOdrzavanja: string = '';
  datumPO: string = '';
  sobaCheck = false;
  sifraCheck = false;
  oldSifra: string = '';
  sobaId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private opremaService: OpremaService,
    private sobaService: SobeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.opremaId = +(params.get('id') ?? '0');
    });
    this.loadOprema();
  }

  loadOprema() {
    this.opremaService.getOpremaById(this.opremaId).subscribe((data) => {
      this.opremaSifra = data.code;
      this.opremaNaziv = data.name;
      this.brojSobe = data.room.roomNumber;
      this.datumPO = this.formatDateForInput(data.lastMaintenance);
      this.datumPoslednjegOdrzavanja = data.lastMaintenance;
      this.oldSifra = data.code;
      this.sobaId = data.room.id;
    });
  }

  formatDateForInput(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }
  reverse(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }
  updateDate() {
    this.datumPoslednjegOdrzavanja = this.reverse(this.datumPO);
  }
  updateSoba() {
    this.sobaCheck = false;
    this.sobaService.getSobaByBrojSobe(this.brojSobe).subscribe(
      (data) => {
        if (data === null || data.equipment.id === this.opremaId) {
          this.sobaCheck = false;
          this.sobaId = data.id;
        } else if (data != null) {
          this.sobaCheck = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  checkSifra() {
    this.sifraCheck = false;
    this.opremaService.checkSifra(this.opremaSifra).subscribe(
      (data) => {
        if (this.opremaSifra == this.oldSifra || data === false) {
          this.sifraCheck = false;
        } else {
          this.sifraCheck = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateOprema() {
    if (
      this.brojSobe.trim() === '' ||
      this.brojSobe.trim() === 'Mora imati sobu'
    ) {
      this.brojSobe = 'Mora imati sobu';
      return;
    }
    if (
      this.opremaSifra.trim() === '' ||
      this.opremaSifra.trim() === 'Mora imati sifru'
    ) {
      this.opremaSifra = 'Mora imati sifru';
      return;
    }
    if (
      this.opremaNaziv.trim() === '' ||
      this.opremaNaziv.trim() === 'Mora imati naziv'
    ) {
      this.opremaNaziv = 'Mora imati naziv';
      return;
    }

    if (!this.sifraCheck && !this.sobaCheck) {
      let data = {
        sifra: this.opremaSifra,
        naziv: this.opremaNaziv,
        idSobe: this.sobaId,
        poslednjeOdrzavanje: this.datumPoslednjegOdrzavanja,
      };

      this.opremaService.updateOprema(this.opremaId, data).subscribe((data) => {
        this.router.navigate(['oprema']);
      });
    }
  }
  deleteOprema() {
    this.opremaService.deleteOprema(this.opremaId).subscribe(
      (data) => {
        this.router.navigate(['oprema']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
