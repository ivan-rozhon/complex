import { Pages, Content } from '@cx-shared/types';

// pages state interface
export interface State {
  pages: Pages;
  pagesLoading: boolean;
  pagesSaving: boolean;
  content: Content;
  contentLoading: boolean;
}

export const detailFeatureKey = 'pages';

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
