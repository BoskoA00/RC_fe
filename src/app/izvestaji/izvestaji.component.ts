import { Component, OnInit } from '@angular/core';
import { IzvestajiService } from '../izvestaji.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css'],
})
export class IzvestajiComponent implements OnInit {
  izvestaji: any[] = [];
  role: number = 0;
  filteredIzvestaji: any[] = [];
  searching: boolean = false;
  searchTerm: string = '';
  constructor(
    private izvestajiService: IzvestajiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.loadIzvestataji();
    }
  }

  loadIzvestataji() {
    if (this.userService.loggedUser && this.userService.loggedUser.role == 0) {
      this.izvestajiService
        .getIzvestajByPacijent(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.izvestaji = data;
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.userService.loggedUser &&
      this.userService.loggedUser.role == 1
    )
      this.izvestajiService
        .getIzvestajByDoktor(this.userService.loggedUser.id)
        .subscribe(
          (data) => {
            this.izvestaji = data;
          },
          (err) => {
            console.log(err);
          }
        );
    else if (
      this.userService.loggedUser &&
      this.userService.loggedUser.role == 2
    ) {
      this.izvestajiService.getAll().subscribe(
        (data) => {
          console.log(data);
          this.izvestaji = data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  deleteIzvestaj(id: number) {
    this.izvestajiService.deleteIzvestaj(id).subscribe(
      (data) => {
        this.loadIzvestataji();
      },
      (err) => {
        console.log(err);
        this.loadIzvestataji();
      }
    );
  }
  changeSearch() {
    this.searching = false;
    if (this.searchTerm.trim().length > 0) {
      this.searching = true;
      this.filteredIzvestaji = this.izvestaji.filter((izvestaj) =>
        izvestaj.code.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searching = false;
      this.filteredIzvestaji = [];
    }
  }
}
