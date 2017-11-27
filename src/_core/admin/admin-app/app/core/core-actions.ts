import { Action } from '@ngrx/store';

import { Credentials } from './core.model';

// core module action types
export const LOGIN = '[Core] Login';
export const LOGIN_SUCCESS = '[Core] Login Success';
export const LOGIN_FAIL = '[Core] Login Fail';

// Every action is comprised of at least a type and an optional payload
export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: Credentials) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload?: any) { }
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload?: any) { }
}

// Export a type alias of all actions in this action group
// (so that reducers can easily compose action types)
export type Actions =
    Login | LoginSuccess | LoginFail;
