import { createAction } from '@ngrx/store';

// load images actions
export const loadImages = createAction('[Media] Load Images');
export const loadImagesSuccess = createAction('[Media] Load Images Success');
export const loadImagesFail = createAction('[Media] Load Images Fail');

// load galleries actions
export const loadGalleries = createAction('[Media] Load Galleries');
export const loadGalleriesSuccess = createAction(
  '[Media] Load Galleries Success'
);
export const loadGalleriesFail = createAction('[Media] Load Galleries Fail');

// create gallery actions
export const CreateGallery = createAction('[Media] Create Gallery');
export const CreateGallerySuccess = createAction(
  '[Media] Create Gallery Success'
);
export const CreateGalleryFail = createAction('[Media] Create Gallery Fail');

// load gallery images actions
export const loadGalleryImages = createAction('[Media] Load Gallery Images');
export const loadGalleryImagesSuccess = createAction(
  '[Media] Load Gallery Images Success'
);
export const loadGalleryImagesFail = createAction(
  '[Media] Load Gallery Images Fail'
);

// delete media (image/gallery) actions
export const deleteMedia = createAction('[Media] Delete Image');
export const deleteMediaSuccess = createAction('[Media] Delete Image Success');
export const deleteMediaFail = createAction('[Media] Delete Image Fail');
