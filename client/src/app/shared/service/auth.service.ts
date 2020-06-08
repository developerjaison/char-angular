import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { CustomService } from './custom.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private readonly customService: CustomService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route.url;

    if (this.customService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }

}
