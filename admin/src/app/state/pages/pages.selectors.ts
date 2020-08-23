import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import * as fromPages from './pages.reducer';

export const getPagesState: MemoizedSelector<
  object,
  fromPages.State
> = createFeatureSelector<fromPages.State>(fromPages.detailFeatureKey);

// pages selectors
// ===
// pages
export const selectPages = createSelector(
  getPagesState,
  (state) => state.pages
);

export const selectPagesLoading = createSelector(
  getPagesState,
  (state) => state.pagesLoading
);

export const selectPagesSaving = createSelector(
  getPagesState,
  (state) => state.pagesSaving
);

// content
export const selectContent = createSelector(
  getPagesState,
  (state) => state.content
);

export const selectContentLoading = createSelector(
  getPagesState,
  (state) => state.contentLoading
);
// ===
