import * as PagesActions from './board-pages-actions';

// board-pages state interface
export interface State {
    pages: any;
    pagesLoading: boolean;
}

// board-pages initial state
export const initialState: State = {
    pages: [],
    pagesLoading: false
};

// board-media state reducer
export function reducer(
    state = initialState,
    action: PagesActions.Actions
): State {
    switch (action.type) {
        case PagesActions.LOAD_PAGES: {
            return {
                ...state,
                pagesLoading: true
            };
        }

        case PagesActions.LOAD_PAGES_SUCCESS:
        case PagesActions.LOAD_PAGES_FAIL: {
            return {
                ...state,
                pages: action.payload,
                pagesLoading: false
            };
        }

        default: {
            return state;
        }
    }
}

// board-pages selectors
// pages
export const getPages = (state: State) => state.pages;
export const getPagesLoading = (state: State) => state.pagesLoading;
