import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Image, Gallery } from './board.model';
import { BoardService } from './board.service';
import * as MediaActions from './board-media/board-media-actions';

@Injectable()
export class BoardEffects {
    constructor(
        private actions$: Actions,
        private boardService: BoardService
    ) { }

    @Effect()
    loadImages$: Observable<Action> = this.actions$.ofType(MediaActions.LOAD_IMAGES)
        .switchMap(() =>
            this.boardService
                .loadMedia<Image[]>('images')
                .map((images: Image[]) => new MediaActions.LoadImagesSuccess(images))
                .catch(err => of(new MediaActions.LoadImagesFail([])))
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
        .switchMap((payload: { mediaType: string, mediaName: string }) =>
            this.boardService
                .removeMedia<null>(payload.mediaType, payload.mediaName)
                .concatMap(() => of(...[
                    new MediaActions.DeleteMediaSuccess(),
                    // reload images/galleries after successful delete
                    payload.mediaType === 'images'
                        ? new MediaActions.LoadImages()
                        : new MediaActions.LoadGalleries()
                ]))
                .catch(err => of(new MediaActions.DeleteMediaFail()))
        );
}
