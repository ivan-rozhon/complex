import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthActions } from '@cx-state/auth';

import { AuthService } from '@cx-core/services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService.login(action.credentials).pipe(
          map(() => {
            // redirect user to original requested URL
            // If no redirect has been set, use the default
            const redirect = this.authService.redirectUrl
              ? this.authService.redirectUrl
              : '';

            // redirect the user
            this.router.navigate([redirect]);

            return AuthActions.loginSuccess();
          }),
          catchError((error) => of(AuthActions.loginFail()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
