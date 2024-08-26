import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { TerapijeService } from '../terapije.service';

@Component({
  selector: 'app-terapije',
  templateUrl: './terapije.component.html',
  styleUrls: ['./terapije.component.css'],
})
export class TerapijeComponent implements OnInit {
  terapije: any[] = [];
  role: number = 0;
  filteredTerapije: any[] = [];
  searching: boolean = false;
  searchTerm: string = '';
  constructor(
    private userService: UserService,
    private terapijeService: TerapijeService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.loadTerapije();
    }
  }

  loadTerapije() {
    if (this.role == 0 && this.userService.loggedUser) {
      this.terapijeService
        .getTerapijeByPacijent(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.terapije = data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.role == 1 && this.userService.loggedUser) {
      this.terapijeService
        .getTerapijeByDoktor(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.terapije = data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.role == 2) {
      this.terapijeService.getAllTerapije().subscribe(
        (data) => {
          this.terapije = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  deleteTerapija(id: number) {
    this.terapijeService.deleteTerapija(id).subscribe(
      (data) => {
        this.loadTerapije();
      },
      (err) => {
        console.log(err);
        this.loadTerapije();
      }
    );
  }
  changeSearch() {
    this.searching = false;
    if (this.searchTerm.trim().length > 0) {
      this.searching = true;
      this.filteredTerapije = this.terapije.filter((terapija) =>
        terapija.sifra.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searching = false;
      this.filteredTerapije = [];
    }
  }
}
