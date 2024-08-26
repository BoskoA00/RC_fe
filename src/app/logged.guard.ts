import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem('user') ||
      localStorage.getItem('token') ==
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODBjNzdkMC05YmJiLTQ3NzctOWNkNy00ZmZlZTliODI4OTQiLCJpZCI6IjQiLCJuYmYiOjE3MTk0Mjc1ODYsImV4cCI6MTcxOTQzNDc4NiwiaWF0IjoxNzE5NDI3NTg2fQ.YVEcEugGt6Vs_YTrbhQLJjDpbvTNNqXJflJmYWF6bmY'
    ) {
      this.router.navigate(['profil']);
      return false;
    } else {
      return true;
    }
  }
}
