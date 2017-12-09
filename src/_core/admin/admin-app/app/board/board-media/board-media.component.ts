import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as MediaActions from './board-media-actions';
import * as fromBoard from './../board-reducers';

import { Image } from './../board.model';

@Component({
    selector: 'ca-board-media',
    templateUrl: 'board-media.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardMediaComponent implements OnInit {
    images$: Observable<Image[]>;
    imagesLoading$: Observable<boolean>;

    constructor(
        private store: Store<fromBoard.State>
    ) { }

    ngOnInit(): void {
        // images & loading indication store stream
        this.images$ = this.store.select(fromBoard.getImages);
        this.imagesLoading$ = this.store.select(fromBoard.getImagesLoading);
    }

    /** dispatch action for load images */
    loadImages(): void {
        this.store.dispatch(new MediaActions.LoadImages());
    }

    /** dispatch action for delete image/gallery */
    deleteMedia(event: { mediaType: string, mediaName: string }): void {
        this.store.dispatch(new MediaActions.DeleteMedia({ mediaType: event.mediaType, mediaName: event.mediaName }));
    }
}
