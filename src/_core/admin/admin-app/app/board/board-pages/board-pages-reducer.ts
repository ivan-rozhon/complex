import * as PagesActions from './board-pages-actions';

import { Pages } from './../board.model';

// board-pages state interface
export interface State {
    pages: Pages;
    pagesLoading: boolean;
}

// board-pages initial state
export const initialState: State = {
    pages: {
        _metadata: {
            schemes: {
                webSchemaMain: { name: '' },
                webSchemaOther: { name: '' },
                webSections: { name: '' }
            },
            data: {}
        },
        webSchema: {
            webSchemaMain: [],
            webSchemaOther: [],
            webSections: []
        }
    },
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

        case PagesActions.LOAD_PAGES_SUCCESS: {
            return {
                ...state,
                pages: action.payload,
                pagesLoading: false
            };
        }

        case PagesActions.LOAD_PAGES_FAIL: {
            return {
                ...state,
                // if pages load fail - get initial state
                pages: initialState.pages,
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
