import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Image, Gallery, Pages, Content } from './board.model';
import { BoardService } from './board.service';
import * as MediaActions from './media/media-actions';
import * as PagesActions from './pages/pages-actions';

@Injectable()
export class BoardEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService
    ) { }

    // media effects
    // ===
    @Effect()
    loadImages$: Observable<Action> = this.actions$.ofType(MediaActions.LOAD_IMAGES)
        .switchMap(() =>
            this.boardService
                .loadMedia<Image[]>('images')
                .map((images: Image[]) => new MediaActions.LoadImagesSuccess(images))
                .catch(err => of(new MediaActions.LoadImagesFail([])))
        );

    @Effect()
    loadGalleryImages$: Observable<Action> = this.actions$.ofType(MediaActions.LOAD_GALLERY_IMAGES)
        .map((action: MediaActions.LoadGalleryImages) => action.payload)
        .switchMap((galleryName: string) =>
            this.boardService
                .loadMedia<Image[]>('gallery', galleryName)
                .map((images: Image[]) => new MediaActions.LoadGalleryImagesSuccess(images))
                .catch(err => of(new MediaActions.LoadGalleryImagesFail([])))
        );

    @Effect()
    loadGalleries$: Observable<Action> = this.actions$.ofType(MediaActions.LOAD_GALLERIES)
        .switchMap(() =>
            this.boardService
                .loadMedia<Gallery[]>('gallery')
                .map((galleries: Gallery[]) => new MediaActions.LoadGalleriesSuccess(galleries))
                .catch(err => of(new MediaActions.LoadGalleriesFail([])))
        );

    @Effect()
    createGallery$: Observable<Action> = this.actions$.ofType(MediaActions.CREATE_GALLERY)
        .map((action: MediaActions.CreateGallery) => action.payload)
        .switchMap((galleryName: string) =>
            this.boardService
                .saveMedia<null>('gallery', galleryName)
                .concatMap(() => of(...[
                    new MediaActions.CreateGallerySuccess(),
                    // reload galleries after successful creation
                    new MediaActions.LoadGalleries()
                ]))
                .catch(err => of(new MediaActions.CreateGalleryFail()))
        );

    @Effect()
    deleteMedia$: Observable<Action> = this.actions$.ofType(MediaActions.DELETE_MEDIA)
        .map((action: MediaActions.DeleteMedia) => action.payload)
        .switchMap((payload: { mediaType: string, mediaName: string, deepMediaName?: string }) =>
            this.boardService
                .removeMedia<null>(payload.mediaType, payload.mediaName, payload.deepMediaName)
                .concatMap(() => of(...[
                    new MediaActions.DeleteMediaSuccess(),
                    // reload images/galleries after successful delete
                    payload.mediaType === 'images'
                        ? new MediaActions.LoadImages()
                        // reload galleries or gallery images (if was deleting gallery/image in gallery)
                        : payload.deepMediaName
                            ? new MediaActions.LoadGalleryImages(payload.mediaName)
                            : new MediaActions.LoadGalleries()
                ]))
                .catch(err => of(new MediaActions.DeleteMediaFail()))
        );
    // ===

    // pages effects
    // ===
    @Effect()
    loadPages$: Observable<Action> = this.actions$.ofType(PagesActions.LOAD_PAGES)
        .switchMap(() =>
            this.boardService
                .loadPages<Pages>()
                .map((pages: Pages) => new PagesActions.LoadPagesSuccess(pages))
                .catch(err => of(new PagesActions.LoadPagesFail()))
        );

    @Effect()
    loadContent$: Observable<Action> = this.actions$.ofType(PagesActions.LOAD_CONTENT)
        .map((action: PagesActions.LoadContent) => action.payload)
        .switchMap((payload: { dataId: string, templateId: string }) =>
            this.boardService
                .loadContent<any>(payload.dataId, payload.templateId)
                .map((content: any) => new PagesActions.LoadContentSuccess(
                    // parse stringifyed data (so JS can work with them as object)
                    Object.assign({}, {
                        _metadata: JSON.parse(content._metadata),
                        data: JSON.parse(content.data)
                    })
                ))
                .catch(err => of(new PagesActions.LoadContentFail()))
        );

    @Effect()
    createContent$: Observable<Action> = this.actions$.ofType(PagesActions.CREATE_CONTENT)
        .map((action: PagesActions.CreateContent) => action.payload)
        .switchMap((payload: { templateId: string, indexes: (number | string)[], pages: Pages }) =>
            this.boardService
                .createContent<string>(payload.templateId)
                // .do((dataId: string) => this.boardService.updatePageItem(payload.pages, payload.indexes, 'data', dataId))
                .map((dataId: string) => new PagesActions.CreateContentSuccess(
                    // update pages schema with new data ID via board service
                    this.boardService.updatePageItem(payload.pages, payload.indexes, 'data', dataId)
                    // TODO... load content
                ))
                .catch(err => of(new PagesActions.CreateContentFail()))
        );
    // ===
}
