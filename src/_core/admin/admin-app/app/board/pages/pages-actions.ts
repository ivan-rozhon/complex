import { Action } from '@ngrx/store';

import { Pages, Content, ContentData } from '../board.model';

// load pages actions
export const LOAD_PAGES = '[Board Pages] Load Pages';
export const LOAD_PAGES_SUCCESS = '[Board Pages] Load Pages Success';
export const LOAD_PAGES_FAIL = '[Board Pages] Load Pages Fail';

// save pages actions
export const SAVE_PAGES = '[Board Pages] Save Pages';
export const SAVE_PAGES_SUCCESS = '[Board Pages] Save Pages Success';
export const SAVE_PAGES_FAIL = '[Board Pages] Save Pages Fail';

// load page content actions
export const LOAD_CONTENT = '[Board Pages] Load Content';
export const LOAD_CONTENT_SUCCESS = '[Board Pages] Load Content Success';
export const LOAD_CONTENT_FAIL = '[Board Pages] Load Content Fail';

// create page content actions
export const CREATE_CONTENT = '[Board Pages] Create Content';
export const CREATE_CONTENT_SUCCESS = '[Board Pages] Create Content Success';
export const CREATE_CONTENT_FAIL = '[Board Pages] Create Content Fail';

// delete page content actions
export const DELETE_CONTENT = '[Board Pages] Delete Content';
export const DELETE_CONTENT_SUCCESS = '[Board Pages] Delete Content Success';
export const DELETE_CONTENT_FAIL = '[Board Pages] Delete Content Fail';

// save page content actions
export const SAVE_CONTENT = '[Board Pages] Save Content';
export const SAVE_CONTENT_SUCCESS = '[Board Pages] Save Content Success';
export const SAVE_CONTENT_FAIL = '[Board Pages] Save Content Fail';

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

// save pages actions
// ===
export class SavePages implements Action {
    readonly type = SAVE_PAGES;

    constructor(public payload: Pages) { }
}

export class SavePagesSuccess implements Action {
    readonly type = SAVE_PAGES_SUCCESS;

    constructor(public payload: Pages) { }
}

export class SavePagesFail implements Action {
    readonly type = SAVE_PAGES_FAIL;

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

// create page content actions
// ===
export class CreateContent implements Action {
    readonly type = CREATE_CONTENT;

    constructor(public payload: {
        templateId: string;
        indexes: (number | string)[];
        pages: Pages
    }) { }
}

export class CreateContentSuccess implements Action {
    readonly type = CREATE_CONTENT_SUCCESS;

    constructor(public payload: Pages) { }
}

export class CreateContentFail implements Action {
    readonly type = CREATE_CONTENT_FAIL;

    constructor(public payload?: any) { }
}
// ===

// delete page content actions
// ===
export class DeleteContent implements Action {
    readonly type = DELETE_CONTENT;

    constructor(public payload: {
        dataId: string;
        indexes: (number | string)[];
        pages: Pages
    }) { }
}

export class DeleteContentSuccess implements Action {
    readonly type = DELETE_CONTENT_SUCCESS;

    constructor(public payload: Pages) { }
}

export class DeleteContentFail implements Action {
    readonly type = DELETE_CONTENT_FAIL;

    constructor(public payload?: any) { }
}
// ===

// save page content actions
// ===
export class SaveContent implements Action {
    readonly type = SAVE_CONTENT;

    constructor(public payload: {
        dataId: string;
        contentData: ContentData
    }) { }
}

export class SaveContentSuccess implements Action {
    readonly type = SAVE_CONTENT_SUCCESS;

    constructor(public payload: ContentData) { }
}

export class SaveContentFail implements Action {
    readonly type = SAVE_CONTENT_FAIL;

    constructor(public payload?: any) { }
}
// ===

// export all types of actions
export type Actions =
    LoadPages | LoadPagesSuccess | LoadPagesFail |
    LoadContent | LoadContentSuccess | LoadContentFail |
    CreateContent | CreateContentSuccess | CreateContentFail |
    DeleteContent | DeleteContentSuccess | DeleteContentFail |
    SavePages | SavePagesSuccess | SavePagesFail |
    SaveContent | SaveContentSuccess | SaveContentFail;
