import { Action } from '@ngrx/store';

// load pages actions
export const LOAD_PAGES = '[Board Pages] Load Pages';
export const LOAD_PAGES_SUCCESS = '[Board Pages] Load Pages Success';
export const LOAD_PAGES_FAIL = '[Board Pages] Load Pages Fail';

// load page content actions
export const LOAD_CONTENT = '[Board Pages] Load Content';
export const LOAD_CONTENT_SUCCESS = '[Board Pages] Load Content Success';
export const LOAD_CONTENT_FAIL = '[Board Pages] Load Content Fail';

import { Pages, Content } from '../board.model';

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

// load page content actions
// ===
export class LoadContent implements Action {
    readonly type = LOAD_CONTENT;

    constructor(public payload: {
        dataId: string,
        templateId: string
    }) { }
}

export class LoadContentSuccess implements Action {
    readonly type = LOAD_CONTENT_SUCCESS;

    constructor(public payload: Content) { }
}

export class LoadContentFail implements Action {
    readonly type = LOAD_CONTENT_FAIL;

    constructor(public payload?: any) { }
}
// ===

// export all types of actions
export type Actions =
    LoadPages | LoadPagesSuccess | LoadPagesFail |
    LoadContent | LoadContentSuccess | LoadContentFail;
