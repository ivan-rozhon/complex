import * as PagesActions from './board-pages-actions';

import { Pages, Content } from './../board.model';

// board-pages state interface
export interface State {
    pages: Pages;
    pagesLoading: boolean;
    content: Content;
    contentLoading: boolean;
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
    pagesLoading: false,
    content: {
        _metadata: {},
        data: {}
    },
    contentLoading: false
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

        case PagesActions.LOAD_CONTENT: {
            return {
                ...state,
                contentLoading: true
            };
        }

        case PagesActions.LOAD_CONTENT_SUCCESS: {
            return {
                ...state,
                content: action.payload,
                contentLoading: false
            };
        }

        case PagesActions.LOAD_CONTENT_FAIL: {
            return {
                ...state,
                // if content load fail - get initial state
                content: initialState.content,
                contentLoading: false
            };
        }

        case PagesActions.CREATE_CONTENT_SUCCESS: {
            return {
                ...state,
                pages: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

// board-pages selectors
// ===
// pages
export const getPages = (state: State) => state.pages;
export const getPagesLoading = (state: State) => state.pagesLoading;
// content
export const getContent = (state: State) => state.content;
export const getContentLoading = (state: State) => state.contentLoading;
// ===
