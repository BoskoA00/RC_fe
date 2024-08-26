import { Component, OnInit } from '@angular/core';
import { SobeService } from '../sobe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sobe',
  templateUrl: './sobe.component.html',
  styleUrls: ['./sobe.component.css'],
})
export class SobeComponent implements OnInit {
  role: number = 0;
  sobe: any[] = [];
  filteredSobe: any[] = [];
  searching: boolean = false;
  searchTerm: string = '';
  constructor(
    private sobeService: SobeService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
    }
    this.loadSobe();
  }
  loadSobe() {
    this.sobeService.getAll().subscribe(
      (data) => {
        this.sobe = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteSoba(id: number): void {
    this.sobeService.deleteSoba(id).subscribe(
      (data) => {
        this.loadSobe();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  reserveRoom(brojSobe: string): void {
    this.sobeService.reserveRoom(brojSobe).subscribe(
      (data) => {
        this.loadSobe();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  disableRoom(brojSobe: string): void {
    this.sobeService.disableRoom(brojSobe).subscribe(
      (data) => {
        this.loadSobe();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  freeRoom(brojSobe: string): void {
    this.sobeService.freeRoom(brojSobe).subscribe(
      (data) => {
        this.loadSobe();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  changeSearch() {
    this.searching = false;
    if (this.searchTerm.trim().length > 0) {
      this.searching = true;
      this.filteredSobe = this.sobe.filter((soba) =>
        soba.brojSobe.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.searching = false;
      this.filteredSobe = [];
    }
  }
}
