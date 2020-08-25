import { Pages, Content } from '@cx/shared/types';
import { createReducer, Action, on } from '@ngrx/store';

import * as PagesActions from './pages.actions';

// pages state interface
export interface State {
  pages: Pages;
  pagesLoading: boolean;
  pagesSaving: boolean;
  content: Content;
  contentLoading: boolean;
}

export const pagesFeatureKey = 'pages';

export const initialState: State = {
  pages: {
    _metadata: {
      schemes: {
        webSchemaMain: { name: '' },
        webSchemaOther: { name: '' },
        webSections: { name: '' },
      },
      data: {},
    },
    webSchema: {
      webSchemaMain: [],
      webSchemaOther: [],
      webSections: [],
    },
  },
  pagesLoading: false,
  pagesSaving: false,
  content: {
    _metadata: {},
    id: '',
    data: {},
  },
  contentLoading: false,
};

const pagesReducer = createReducer(
  initialState,
  on(PagesActions.loadPages, (state, _) => ({ ...state, pagesLoading: true })),
  on(PagesActions.savePages, (state, _) => ({ ...state, pagesSaving: true })),

  on(PagesActions.loadPagesSuccess, (state, { pages }) => ({
    ...state,
    pagesLoading: false,
    pages,
  })),
  on(PagesActions.savePagesSuccess, (state, { pages }) => ({
    ...state,
    pagesSaving: false,
    pages,
  })),

  on(PagesActions.loadPagesFail, (state, _) => ({
    ...state,
    pagesLoading: false,
    pages: initialState.pages,
  })),
  on(PagesActions.savePagesSuccess, (state, _) => ({
    ...state,
    pagesSaving: false,
    pages: initialState.pages,
  })),

  on(PagesActions.loadContent, PagesActions.saveContent, (state) => ({
    ...state,
    contentLoading: true,
  })),

  on(PagesActions.loadContentSuccess, (state, { content }) => ({
    ...state,
    contentLoading: false,
    content,
  })),

  on(PagesActions.loadContentFail, (state) => ({
    ...state,
    contentLoading: false,
    content: initialState.content,
  })),

  on(
    PagesActions.createContentSuccess,
    PagesActions.deleteContentSuccess,
    (state, { pages }) => ({
      ...state,
      pages,
    })
  ),

  on(PagesActions.saveContentSuccess, (state, { contentData }) => ({
    ...state,
    content: Object.assign({}, state.content, {
      // update just data (id and _meta is still same afte save)
      data: contentData,
    }),
  }))
);

export function reducer(state: State | undefined, action: Action): any {
  return pagesReducer(state, action);
}
