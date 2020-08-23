import { Pages, Content } from '@cx-shared/types';
import { createReducer, Action } from '@ngrx/store';

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

const pagesReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action): any {
  return pagesReducer(state, action);
}