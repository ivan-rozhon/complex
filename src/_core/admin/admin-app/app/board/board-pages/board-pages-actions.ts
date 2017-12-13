import { Action } from '@ngrx/store';

// load pages actions
export const LOAD_PAGES = '[Board Pages] Load Pages';
export const LOAD_PAGES_SUCCESS = '[Board Pages] Load Pages Success';
export const LOAD_PAGES_FAIL = '[Board Pages] Load Pages Fail';

import { Pages } from '../board.model';

// Every action is comprised of at least a type and an optional payload

// load pages actions
// ===
export class LoadPages implements Action {
    readonly type = LOAD_PAGES;

    constructor(public payload?: any) { }
}

export class LoadPagesSuccess implements Action {
    readonly type = LOAD_PAGES_SUCCESS;

    constructor(public payload: Pages) { }
}

export class LoadPagesFail implements Action {
    readonly type = LOAD_PAGES_FAIL;

    constructor(public payload?: any) { }
}
// ===

// export all types of actions
export type Actions =
    LoadPages | LoadPagesSuccess | LoadPagesFail;
