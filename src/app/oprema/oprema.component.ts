import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { OpremaService } from '../oprema.service';

@Component({
  selector: 'app-oprema',
  templateUrl: './oprema.component.html',
  styleUrls: ['./oprema.component.css'],
})
export class OpremaComponent implements OnInit {
  role: number = 0;
  oprema: any[] = [];
  filteredOprema: any[] = [];
  searching: boolean = false;
  searchTerm: string = '';
  constructor(
    private userService: UserService,
    private opremaService: OpremaService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
    }
    this.loadOprema();
  }
  loadOprema() {
    this.opremaService.getAll().subscribe((res) => {
      this.oprema = res;
    });
  }
  deleteOprema(id: number) {
    this.opremaService.deleteOprema(id).subscribe((data) => {
      this.loadOprema();
    });
  }
  changeSearch() {
    this.searching = false;
    if (this.searchTerm.trim().length > 0) {
      this.searching = true;
      this.filteredOprema = this.oprema.filter((oprema) =>
        oprema.sifra.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searching = false;
      this.filteredOprema = [];
    }
  }
}
