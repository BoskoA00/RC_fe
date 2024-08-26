import { Component, OnInit } from '@angular/core';
import { IzvestajiService } from '../izvestaji.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-izvestaji',
  templateUrl: './edit-izvestaji.component.html',
  styleUrls: ['./edit-izvestaji.component.css'],
})
export class EditIzvestajiComponent implements OnInit {
  sadrzaj: string = '';
  imePacijenta: string = '';
  prezimePacijenta: string = '';
  sifraIzvestaja: string = '';
  idIzvestaja: number = 0;

  constructor(
    private izvestajServ: IzvestajiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idIzvestaja = +(params.get('id') ?? '0');
      this.loadIzvestaj();
    });
  }

  loadIzvestaj(): void {
    this.izvestajServ.getIzvestajById(this.idIzvestaja).subscribe(
      (data) => {
        console.log(data);
        this.sadrzaj = data.sadrzaj;
        this.imePacijenta = data.pacijent.firstName;
        this.prezimePacijenta = data.pacijent.lastName;
        this.sifraIzvestaja = data.sifra;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateIzvestaj(): void {
    this.izvestajServ.updateIzvestaj(this.idIzvestaja, this.sadrzaj).subscribe(
      (data) => {
        this.router.navigate(['izvestaji']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteIzvestaj(): void {
    this.izvestajServ.deleteIzvestaj(this.idIzvestaja).subscribe(
      (data) => {
        this.router.navigate(['izvestaji']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
