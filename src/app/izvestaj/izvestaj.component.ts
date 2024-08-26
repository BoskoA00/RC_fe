import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IzvestajiService } from '../izvestaji.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.css'],
})
export class IzvestajComponent implements OnInit {
  role: number = 0;
  izvestaj: any = [];
  izvestajId: number = 0;
  constructor(
    private userService: UserService,
    private izvesatajService: IzvestajiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.route.paramMap.subscribe((params) => {
        this.izvestajId = +(params.get('id') ?? '0');
      });
      this.loadIzvestaj();
      this.role = this.userService.loggedUser.role;
    }
  }

  loadIzvestaj() {
    this.izvesatajService.getIzvestajById(this.izvestajId).subscribe((data) => {
      this.izvestaj = data;
      console.log(this.izvestaj);
    });
  }
}
