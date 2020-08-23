import { createAction, props } from '@ngrx/store';

import { Credentials } from '@cx-shared/types';

export const login = createAction('[Auth] Login', props<Credentials>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFail = createAction('[Auth] Login Fail');
