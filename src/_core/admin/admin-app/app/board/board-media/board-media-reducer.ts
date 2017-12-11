import * as MediaActions from './board-media-actions';

import { Image, Gallery } from '../board.model';

// board-media state interface
export interface State {
    images: Image[];
    imagesLoading: boolean;
    galleries: Gallery[];
    galleriesLoading: boolean;
}

// board-media initial state
export const initialState: State = {
    images: [],
    imagesLoading: false,
    galleries: [],
    galleriesLoading: false
};

// board-media state reducer
export function reducer(
    state = initialState,
    action: MediaActions.Actions
): State {
    switch (action.type) {
        case MediaActions.LOAD_IMAGES: {
            return {
                ...state,
                imagesLoading: true
            };
        }

        case MediaActions.LOAD_IMAGES_SUCCESS:
        case MediaActions.LOAD_IMAGES_FAIL: {
            return {
                ...state,
                images: action.payload,
                imagesLoading: false
            };
        }

        case MediaActions.LOAD_GALLERIES: {
            return {
                ...state,
                galleriesLoading: true
            };
        }

        case MediaActions.LOAD_GALLERIES_SUCCESS:
        case MediaActions.LOAD_GALLERIES_FAIL: {
            return {
                ...state,
                galleries: action.payload,
                galleriesLoading: false
            };
        }

        default: {
            return state;
        }
    }
}

// board-media selectors
// images
export const getImages = (state: State) => state.images;
export const getImagesLoading = (state: State) => state.imagesLoading;
// galleries
export const getGalleries = (state: State) => state.galleries;
export const getGalleriesLoading = (state: State) => state.galleriesLoading;
