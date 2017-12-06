import { Action } from '@ngrx/store';

import { Image } from '../board.model';

// Load images actions
export const LOAD_IMAGES = '[Board Media] Load Images';
export const LOAD_IMAGES_SUCCESS = '[Board Media] Load Images Success';
export const LOAD_IMAGES_FAIL = '[Board Media] Load Images Fail';

// Every action is comprised of at least a type and an optional payload
// ===
export class LoadImages implements Action {
    readonly type = LOAD_IMAGES;

    constructor(public payload?: string) { }
}

export class LoadImagesSuccess implements Action {
    readonly type = LOAD_IMAGES_SUCCESS;

    constructor(public payload: Image[]) { }
}

export class LoadImagesFail implements Action {
    readonly type = LOAD_IMAGES_FAIL;

    constructor(public payload: Image[]) { }
}
// ===

export type Actions = LoadImages | LoadImagesSuccess | LoadImagesFail;
