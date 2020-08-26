import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap } from 'rxjs/operators';

import { PagesActions } from '@cx/state/pages';

import { Pages, ContentData } from '@cx/shared/types';

import { PagesService } from '@cx/screens/pages/pages.service';

@Injectable()
export class PagesEffects {
  loadPages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.loadPages),
      switchMap((_) =>
        this.pagesService.loadPages<Pages>().pipe(
          map((pages: Pages) => PagesActions.loadPagesSuccess({ pages })),
          catchError((__) => of(PagesActions.loadPagesFail()))
        )
      )
    )
  );

  savePages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.savePages),
      switchMap((action) =>
        this.pagesService.savePages<Pages>(action.pages).pipe(
          map((pages: Pages) => PagesActions.savePagesSuccess({ pages })),
          catchError((_) => of(PagesActions.savePagesFail()))
        )
      )
    )
  );

  loadContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.loadContent),
      switchMap((action) =>
        this.pagesService
          .loadContent<any>(action.dataId, action.templateId)
          .pipe(
            map((content: any) =>
              PagesActions.loadContentSuccess(
                // parse stringifyed data (so JS can work with them as object)
                {
                  content: Object.assign(
                    {},
                    {
                      _metadata: JSON.parse(content._metadata),
                      id: action.dataId,
                      data: JSON.parse(content.data),
                    }
                  ),
                }
              )
            ),
            catchError((_) => of(PagesActions.loadContentFail()))
          )
      )
    )
  );

  createContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.createContent),
      switchMap((action) =>
        this.pagesService.createContent<any>(action.templateId).pipe(
          concatMap((dataId: string) => {
            // update pages schema with new data ID via board service
            const updatedPages = this.pagesService.updatePageItem(
              action.pages,
              action.indexes,
              'data',
              dataId
            );

            // update pages, save pages, load content
            return of(
              ...[
                PagesActions.createContentSuccess({ pages: updatedPages }),
                // save schema on BE
                PagesActions.savePages({ pages: updatedPages }),
                // load content (immediately after creating it)
                PagesActions.loadContent({
                  dataId,
                  templateId: action.templateId,
                }),
              ]
            );
          }),
          catchError((error: any) =>
            of(PagesActions.createContentFail({ error }))
          )
        )
      )
    )
  );

  deleteContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.deleteContent),
      switchMap((action) =>
        this.pagesService.deleteContent<any>(action.dataId).pipe(
          concatMap(() => {
            // update pages schema - delete removed data ID (set empty string)
            const updatedPages = this.pagesService.updatePageItem(
              action.pages,
              action.indexes,
              'data',
              ''
            );

            return of(
              ...[
                PagesActions.deleteContentSuccess({ pages: updatedPages }),
                // save schema on BE
                PagesActions.savePages({ pages: updatedPages }),
              ]
            );
          }),
          catchError((_) => of(PagesActions.deleteContentFail()))
        )
      )
    )
  );

  saveContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PagesActions.saveContent),
      switchMap((action) =>
        this.pagesService
          .saveContent<ContentData>(action.dataId, action.contentData)
          .pipe(
            map((contentData: ContentData) =>
              PagesActions.saveContentSuccess({ contentData })
            ),
            catchError((_) => of(PagesActions.saveContentFail()))
          )
      )
    )
  );

  constructor(private actions$: Actions, private pagesService: PagesService) {}
}
