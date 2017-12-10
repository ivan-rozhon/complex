import { Action } from '@ngrx/store';

import { Image, Gallery } from '../board.model';

// load images actions
export const LOAD_IMAGES = '[Board Media] Load Images';
export const LOAD_IMAGES_SUCCESS = '[Board Media] Load Images Success';
export const LOAD_IMAGES_FAIL = '[Board Media] Load Images Fail';

// load galleries actions
export const LOAD_GALLERIES = '[Board Media] Load Galleries';
export const LOAD_GALLERIES_SUCCESS = '[Board Media] Load Galleries Success';
export const LOAD_GALLERIES_FAIL = '[Board Media] Load Galleries Fail';

// create gallery actions
export const CREATE_GALLERY = '[Board Media] Create Gallery';
export const CREATE_GALLERY_SUCCESS = '[Board Media] Create Gallery Success';
export const CREATE_GALLERY_FAIL = '[Board Media] Create Gallery Fail';

// delete image actions
export const DELETE_MEDIA = '[Board Media] Delete Image';
export const DELETE_MEDIA_SUCCESS = '[Board Media] Delete Image Success';
export const DELETE_MEDIA_FAIL = '[Board Media] Delete Image Fail';

// Every action is comprised of at least a type and an optional payload

// load images actions
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

// load galleries actions
// ===
export class LoadGalleries implements Action {
    readonly type = LOAD_GALLERIES;

    constructor(public payload?: string) { }
}

export class LoadGalleriesSuccess implements Action {
    readonly type = LOAD_GALLERIES_SUCCESS;

    constructor(public payload: Gallery[]) { }
}

export class LoadGalleriesFail implements Action {
    readonly type = LOAD_GALLERIES_FAIL;

    constructor(public payload: Gallery[]) { }
}
// ===

// create gallery actions
// ===
export class CreateGallery implements Action {
    readonly type = CREATE_GALLERY;

    constructor(public payload: string) { }
}

export class CreateGallerySuccess implements Action {
    readonly type = CREATE_GALLERY_SUCCESS;

    constructor(public payload?: any) { }
}

export class CreateGalleryFail implements Action {
    readonly type = CREATE_GALLERY_FAIL;

    constructor(public payload?: any) { }
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
    LoadGalleries | LoadGalleriesSuccess | LoadGalleriesFail |
    CreateGallery | CreateGallerySuccess | CreateGalleryFail |
    DeleteMedia | DeleteMediaSuccess | DeleteMediaFail;
