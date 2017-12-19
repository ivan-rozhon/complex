import * as MediaActions from './media-actions';

import { Image, Gallery } from '../board.model';

// media state interface
export interface State {
    images: Image[];
    imagesLoading: boolean;
    galleries: Gallery[];
    galleriesLoading: boolean;
    galleryImages: Image[];
    galleryImagesLoading: boolean;
}

// media initial state
export const initialState: State = {
    images: [],
    imagesLoading: false,
    galleries: [],
    galleriesLoading: false,
    galleryImages: [],
    galleryImagesLoading: false
};

// media state reducer
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

        case MediaActions.LOAD_GALLERY_IMAGES: {
            return {
                ...state,
                galleryImagesLoading: true
            };
        }

        case MediaActions.LOAD_GALLERY_IMAGES_SUCCESS:
        case MediaActions.LOAD_GALLERY_IMAGES_FAIL: {
            return {
                ...state,
                galleryImages: action.payload,
                galleryImagesLoading: false
            };
        }

        default: {
            return state;
        }
    }
}

// media selectors
// images
export const getImages = (state: State) => state.images;
export const getImagesLoading = (state: State) => state.imagesLoading;
// galleries
export const getGalleries = (state: State) => state.galleries;
export const getGalleriesLoading = (state: State) => state.galleriesLoading;
// gallery images
export const getGalleryImages = (state: State) => state.galleryImages;
export const getGalleryImagesLoading = (state: State) => state.galleryImagesLoading;
