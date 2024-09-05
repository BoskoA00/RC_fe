import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/Interfaces/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css'],
})
export class PacijentComponent implements OnInit {
  korisnik: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: 0,
    contact: '',
    birthDate: '',
  };
  pacijentId: number = 0;
  role = 0;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.role = this.userService.loggedUser.role;
      this.route.paramMap.subscribe((params) => {
        this.pacijentId = +(params.get('id') ?? '0');
      });
      this.loadPacijent();
    }
  }
  loadPacijent() {
    this.userService.getUserById(this.pacijentId).subscribe(
      (data) => {
        this.korisnik = data;
        console.log(this.korisnik);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
