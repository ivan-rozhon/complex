import { ActionReducerMap } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromMedia from './board-media/board-media-reducer';
import * as fromRoot from './../app-reducers';

export interface BoardState {
    media: fromMedia.State;
}

export interface State extends fromRoot.State {
    board: BoardState;
}

export const reducers = {
    media: fromMedia.reducer
};

export const selectBoardState = createFeatureSelector<BoardState>('board');

export const selectBoardMediaState = createSelector(
    selectBoardState,
    (state: BoardState) => state.media
);

export const getImages = createSelector(selectBoardMediaState, fromMedia.getImages);
export const getImagesLoading = createSelector(selectBoardMediaState, fromMedia.getImagesLoading);
