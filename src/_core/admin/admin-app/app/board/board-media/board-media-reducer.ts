import * as MediaActions from './board-media-actions';

import { Image } from '../board.model';

// board-media state interface
export interface State {
    images: Image[];
    imagesLoading: boolean;
}

// board-media initial state
export const mediaInitialState: State = {
    images: [],
    imagesLoading: false
};

// board-media state reducer
export function reducer(state = mediaInitialState, action: MediaActions.Actions) {
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
    }
}

// board-media selectors
export const getImages = (state: State) => state.images;
