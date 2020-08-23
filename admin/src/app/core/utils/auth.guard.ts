import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  RouterStateSnapshot,
  Route,
  Router,
} from '@angular/router';

import { AuthService } from '@cx-shared/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // get actual requested url
    const url: string = state.url;

    // check login via auth service
    return this.checkLogin(url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    // check login via auth service
    return this.checkLogin(url);
  }

  /**
   * Check if user is already logged in
   * @param url requested URL
   */
  checkLogin(url: string): boolean {
    // ask auth service if user is loggen in
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page
    this.router.navigate(['/login']);

    return false;
  }
}
