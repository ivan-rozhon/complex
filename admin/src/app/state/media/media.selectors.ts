import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import * as fromMedia from './media.reducer';

export const getMediaState: MemoizedSelector<
  object,
  fromMedia.State
> = createFeatureSelector<fromMedia.State>(fromMedia.mediaFeatureKey);

// media selectors
// images
export const selectImages = createSelector(
  getMediaState,
  (state) => state.images
);
export const selectImagesLoading = createSelector(
  getMediaState,
  (state) => state.imagesLoading
);
// galleries
export const selectGalleries = createSelector(
  getMediaState,
  (state) => state.galleries
);
export const selectGalleriesLoading = createSelector(
  getMediaState,
  (state) => state.galleriesLoading
);
// gallery images
export const selectGalleryImages = createSelector(
  getMediaState,
  (state) => state.galleryImages
);
export const selectGalleryImagesLoading = createSelector(
  getMediaState,
  (state) => state.galleryImagesLoading
);
