import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { TerapijeService } from '../terapije.service';
import { SesijeService } from '../sesije.service';

@Component({
  selector: 'app-terapija',
  templateUrl: './terapija.component.html',
  styleUrls: ['./terapija.component.css'],
})
export class TerapijaComponent implements OnInit {
  terapijaId: number = 0;
  terapija: any = [];
  sesije: any = [];
  role: number = 0;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private terapijaService: TerapijeService,
    private sesijaService: SesijeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.terapijaId = +(params.get('id') ?? '0');
    });
    this.loadTerapija();
    this.loadSesije();
    if (this.userService.loggedUser)
      this.role = this.userService.loggedUser.role;
  }
  loadSesije() {
    this.sesijaService.getSesijaByTerapijaId(this.terapijaId).subscribe(
      (data) => {
        this.sesije = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loadTerapija() {
    this.terapijaService.getTerapijaById(this.terapijaId).subscribe(
      (data) => {
        this.terapija = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
