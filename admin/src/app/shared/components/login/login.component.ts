import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { RootState } from '@cx/state/index';

import { AuthActions } from '@cx/state/auth';

import { Credentials } from '@cx/shared/types';

@Component({
  selector: 'cx-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store$: Store<RootState>) {}

  ngOnInit(): void {
    // build login form via FormBuilder
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Log in user.
   * @param credentials User`s Username and Password.
   */
  login(credentials: Credentials): void {
    // reasign credentials with encoded ones (base-64)
    credentials = Object.assign(
      {},
      {
        username: window.btoa(credentials.username.trim()),
        password: window.btoa(credentials.password.trim()),
      }
    );

    // dispatch login action to Store
    this.store$.dispatch(AuthActions.login({credentials}));
  }
}
