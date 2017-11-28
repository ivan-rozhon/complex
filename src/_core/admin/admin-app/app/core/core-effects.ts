import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as CoreActions from './core-actions';
import { Credentials } from './core.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class CoreEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.ofType(CoreActions.LOGIN)
        .map((action: CoreActions.Login) => action.payload)
        .switchMap((credentials: Credentials) =>
            this.authService
                .login(credentials)
                .map(() => {
                    // redirect user to original requested URL
                    // If no redirect has been set, use the default
                    const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';

                    // redirect the user
                    this.router.navigate([redirect]);

                    return new CoreActions.LoginSuccess();
                })
                .catch(() => of(new CoreActions.LoginFail()))
        );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}
