import { createAction, props } from '@ngrx/store';

import { Pages, Content, ContentData } from '@cx/shared/types';

// load pages actions
export const loadPages = createAction('[Pages] Load Pages');
export const loadPagesSuccess = createAction(
  '[Pages] Load Pages Success',
  props<{ pages: Pages }>()
);
export const loadPagesFail = createAction('[Pages] Load Pages Fail');

// save pages actions
export const savePages = createAction(
  '[Pages] Save Pages',
  props<{ pages: Pages }>()
);
export const savePagesSuccess = createAction(
  '[Pages] Save Pages Success',
  props<{ pages: Pages }>()
);
export const savePagesFail = createAction('[Pages] Save Pages Fail');

// load page content actions
export const loadContent = createAction(
  '[Pages] Load Content',
  props<{
    dataId: string;
    templateId: string;
  }>()
);
export const loadContentSuccess = createAction(
  '[Pages] Load Content Success',
  props<{ content: Content }>()
);
export const loadContentFail = createAction('[Pages] Load Content Fail');

// create page content actions
export const createContent = createAction(
  '[Pages] Create Content',
  props<{
    templateId: string;
    indexes: (number | string)[];
    pages: Pages;
  }>()
);
export const createContentSuccess = createAction(
  '[Pages] Create Content Success',
  props<{ pages: Pages }>()
);
export const createContentFail = createAction('[Pages] Create Content Fail');

// delete page content actions
export const deleteContent = createAction(
  '[Pages] Delete Content',
  props<{
    dataId: string;
    indexes: (number | string)[];
    pages: Pages;
  }>()
);
export const deleteContentSuccess = createAction(
  '[Pages] Delete Content Success',
  props<{ pages: Pages }>()
);
export const deleteContentFail = createAction('[Pages] Delete Content Fail');

// save page content actions
export const saveContent = createAction(
  '[Pages] Save Content',
  props<{
    dataId: string;
    contentData: ContentData;
  }>()
);
export const saveContentSuccess = createAction(
  '[Pages] Save Content Success',
  props<{ contentData: ContentData }>()
);
export const saveContentFail = createAction('[Pages] Save Content Fail');
