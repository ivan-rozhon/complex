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
    deleteMedia$: Observable<Action> = this.actions$.ofType(MediaActions.DELETE_MEDIA)
        .map((action: MediaActions.DeleteMedia) => action.payload)
        .switchMap((payload: { mediaType: string, mediaName: string }) =>
            this.boardService
                .removeMedia<null>(payload.mediaType, payload.mediaName)
                .concatMap(() => of(...[
                    new MediaActions.DeleteMediaSuccess(),
                    // reload images after successful delete
                    new MediaActions.LoadImages()
                ]))
                .catch(err => of(new MediaActions.DeleteMediaFail()))
        );
}
