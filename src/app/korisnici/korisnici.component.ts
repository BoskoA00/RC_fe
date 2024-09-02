import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css'],
})
export class KorisniciComponent implements OnInit {
  role: number = 0;
  korisnici: any[] = [];
  userId: number = 0;
  searching: boolean = false;
  searchTerm: string = '';
  filteredKorisnici: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.userId = this.userService.loggedUser.id;
    }
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.korisnici = res.filter((user: any) => user.id !== this.userId);
    });
  }
  promoteUser(id: number): void {
    this.userService.promoteUser(id).subscribe((res: any) => {
      this.loadUsers();
    });
  }
  demoteUser(id: number): void {
    this.userService.demoteUser(id).subscribe((res: any) => {
      this.loadUsers();
    });
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe((res: any) => {
      console.log(res);
      this.loadUsers();
    });
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
