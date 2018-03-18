import * as PagesActions from './pages-actions';

import { Pages, Content } from './../board.model';

// pages state interface
export interface State {
    pages: Pages;
    pagesLoading: boolean;
    pagesSaving: boolean;
    content: Content;
    contentLoading: boolean;
}

// pages initial state
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
    pagesSaving: false,
    content: {
        _metadata: {},
        id: '',
        data: {}
    },
    contentLoading: false
};

// media state reducer
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

        case PagesActions.SAVE_PAGES: {
            return {
                ...state,
                pagesSaving: true
            };
        }

        case PagesActions.LOAD_PAGES_SUCCESS: {
            return {
                ...state,
                pages: action.payload,
                pagesLoading: false
            };
        }

        case PagesActions.SAVE_PAGES_SUCCESS: {
            return {
                ...state,
                pages: action.payload,
                pagesSaving: false
            };
        }

        case PagesActions.LOAD_PAGES_FAIL: {
            return {
                ...state,
                // if pages load/save fail - get initial state
                pages: initialState.pages,
                pagesLoading: false
            };
        }

        case PagesActions.SAVE_PAGES_FAIL: {
            return {
                ...state,
                // if pages load/save fail - get initial state
                pages: initialState.pages,
                pagesSaving: false
            };
        }

        case PagesActions.LOAD_CONTENT:
        case PagesActions.SAVE_CONTENT: {
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

        case PagesActions.CREATE_CONTENT_SUCCESS:
        case PagesActions.DELETE_CONTENT_SUCCESS: {
            return {
                ...state,
                pages: action.payload
            };
        }

        case PagesActions.SAVE_CONTENT_SUCCESS: {
            return {
                ...state,
                content: Object.assign({}, state.content, {
                    // update just data (id and _meta is still same afte save)
                    data: action.payload
                })
            };
        }

        default: {
            return state;
        }
    }
}

// pages selectors
// ===
// pages
export const getPages = (state: State) => state.pages;
export const getPagesLoading = (state: State) => state.pagesLoading;
export const getPagesSaving = (state: State) => state.pagesSaving;
// content
export const getContent = (state: State) => state.content;
export const getContentLoading = (state: State) => state.contentLoading;
// ===
