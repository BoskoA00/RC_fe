import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pacijenti',
  templateUrl: './pacijenti.component.html',
  styleUrls: ['./pacijenti.component.css'],
})
export class PacijentiComponent implements OnInit {
  role: number = 0;
  korisnici: any[] = [];
  filteredKorisnici: any[] = [];
  searching: boolean = false;
  searchTerm: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getUsersByRole(0).subscribe(
      (data) => {
        this.korisnici = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deletePacijenta(id: number) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        this.loadUsers();
      },
      (err) => {
        console.log(err);
        this.loadUsers();
      }
    );
  }
  changeSearch() {
    this.searching = false;
    const terms = this.searchTerm.trim().toLowerCase().split(' ');

    if (terms.length === 1 && terms[0].length > 0) {
      this.searching = true;
      this.filteredKorisnici = this.korisnici.filter(
        (k) =>
          k.firstName.toLowerCase().includes(terms[0]) ||
          k.lastName.toLowerCase().includes(terms[0])
      );
    } else if (terms.length > 1) {
      this.searching = true;
      this.filteredKorisnici = this.korisnici.filter((k) =>
        terms.every(
          (term) =>
            k.firstName.toLowerCase().includes(term) ||
            k.lastName.toLowerCase().includes(term)
        )
      );
    } else {
      this.searching = false;
      this.filteredKorisnici = [];
    }
  }
}
