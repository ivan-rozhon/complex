import { ActionReducerMap } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../app-reducers';
import * as fromMedia from './media/media-reducer';
import * as fromPages from './pages/pages-reducer';

export interface BoardState {
    media: fromMedia.State;
    pages: fromPages.State;
}

export interface State extends fromRoot.State {
    board: BoardState;
}

export const reducers = {
    media: fromMedia.reducer,
    pages: fromPages.reducer
};

// 'board' feature selector
export const selectBoardState = createFeatureSelector<BoardState>('board');

// 'media' state selector
export const selectBoardMediaState = createSelector(
    selectBoardState,
    (state: BoardState) => state.media
);

// media-images
export const getImages = createSelector(selectBoardMediaState, fromMedia.getImages);
export const getImagesLoading = createSelector(selectBoardMediaState, fromMedia.getImagesLoading);
// media-galleries
export const getGalleries = createSelector(selectBoardMediaState, fromMedia.getGalleries);
export const getGalleriesLoading = createSelector(selectBoardMediaState, fromMedia.getGalleriesLoading);
// media-gallery-images
export const getGalleryImages = createSelector(selectBoardMediaState, fromMedia.getGalleryImages);
export const getGalleryImagesLoading = createSelector(selectBoardMediaState, fromMedia.getGalleryImagesLoading);

// 'pages' state selector
export const selectBoardPagesState = createSelector(
    selectBoardState,
    (state: BoardState) => state.pages
);

// pages
export const getPages = createSelector(selectBoardPagesState, fromPages.getPages);
export const getPagesLoading = createSelector(selectBoardPagesState, fromPages.getPagesLoading);
export const getPagesSaving = createSelector(selectBoardPagesState, fromPages.getPagesSaving);
// content
export const getContent = createSelector(selectBoardPagesState, fromPages.getContent);
export const getContentLoading = createSelector(selectBoardPagesState, fromPages.getContentLoading);
