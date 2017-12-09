import { Action } from '@ngrx/store';

import { Image } from '../board.model';

// Load images actions
export const LOAD_IMAGES = '[Board Media] Load Images';
export const LOAD_IMAGES_SUCCESS = '[Board Media] Load Images Success';
export const LOAD_IMAGES_FAIL = '[Board Media] Load Images Fail';

// delete image actions
export const DELETE_MEDIA = '[Board Media] Delete Image';
export const DELETE_MEDIA_SUCCESS = '[Board Media] Delete Image Success';
export const DELETE_MEDIA_FAIL = '[Board Media] Delete Image Fail';

// Every action is comprised of at least a type and an optional payload

// Load images actions
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

// delete image actions
// ===
export class DeleteMedia implements Action {
    readonly type = DELETE_MEDIA;

    constructor(public payload: {
        mediaType: string,
        mediaName: string
    }) { }
}

export class DeleteMediaSuccess implements Action {
    readonly type = DELETE_MEDIA_SUCCESS;

    constructor(public payload?: any) { }
}

export class DeleteMediaFail implements Action {
    readonly type = DELETE_MEDIA_FAIL;

    constructor(public payload?: any) { }
}
// ===

// export all types of actions
export type Actions =
    LoadImages | LoadImagesSuccess | LoadImagesFail |
    DeleteMedia | DeleteMediaSuccess | DeleteMediaFail;
