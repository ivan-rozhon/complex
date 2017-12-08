import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Image } from './board.model';
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
}
