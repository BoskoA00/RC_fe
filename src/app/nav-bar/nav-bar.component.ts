import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  role: number = 0;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.loggedUser)
      this.role = this.userService.loggedUser.role;
  }

  LogOut() {
    this.userService.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  LoggedIn() {
    return this.userService.loggedIn;
  }
  SetRole(): number | undefined {
    if (this.userService.loggedUser) return this.userService.loggedUser.role;
    return undefined;
  }
}
