import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as MediaActions from './board-media-actions';
import * as fromBoard from './../board-reducers';

import { Image, Gallery } from './../board.model';

@Component({
    selector: 'ca-board-media',
    templateUrl: 'board-media.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardMediaComponent implements OnInit {
    // images streams
    images$: Observable<Image[]>;
    imagesLoading$: Observable<boolean>;
    // galleries streams
    galleries$: Observable<Gallery[]>;
    galleriesLoading$: Observable<boolean>;
    // gallery images streams
    galleryImages$: Observable<Image[]>;
    galleryImagesLoading$: Observable<boolean>;

    constructor(
        private store: Store<fromBoard.State>
    ) { }

    ngOnInit(): void {
        // images & loading indication store streams
        this.images$ = this.store.select(fromBoard.getImages);
        this.imagesLoading$ = this.store.select(fromBoard.getImagesLoading);
        // galleries & loading indication store streams
        this.galleries$ = this.store.select(fromBoard.getGalleries);
        this.galleriesLoading$ = this.store.select(fromBoard.getGalleriesLoading);
        // gallery images & loading indication store streams
        this.galleryImages$ = this.store.select(fromBoard.getGalleryImages);
        this.galleryImagesLoading$ = this.store.select(fromBoard.getGalleryImagesLoading);
    }

    /** dispatch action for load images */
    loadImages(): void {
        this.store.dispatch(new MediaActions.LoadImages());
    }

    /** dispatch action for load gallery images */
    loadGalleryImages(galleryName): void {
        this.store.dispatch(new MediaActions.LoadGalleryImages(galleryName));
    }

    /** dispatch action for load galleries */
    loadGalleries(): void {
        this.store.dispatch(new MediaActions.LoadGalleries());
    }

    /** dispatch action for create gallery */
    createGallery(galleryName): void {
        this.store.dispatch(new MediaActions.CreateGallery(galleryName));
    }

    /** dispatch action for delete image/gallery */
    deleteMedia(event: { mediaType: string, mediaName: string, deepMediaName?: string }): void {
        this.store.dispatch(
            new MediaActions.DeleteMedia({ mediaType: event.mediaType, mediaName: event.mediaName, deepMediaName: event.deepMediaName })
        );
    }
}
