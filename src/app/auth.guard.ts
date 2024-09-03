import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserRole } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.userService.loggedUser &&
      (this.userService.loggedUser.role == UserRole.Admin ||
        this.userService.loggedUser.role == UserRole.Terapeut)
    ) {
      return true;
    } else {
      this.route.navigate(['profil']);
      return false;
    }
  }
}
