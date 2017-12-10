import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as UIkit from 'uikit';

@Component({
    selector: 'ca-board-media-galleries',
    templateUrl: 'board-media-galleries.component.html'
})

export class BoardMediaGalleriesComponent implements OnInit {
    @Output() onLoadGalleries = new EventEmitter<any>();
    @Output() onCreateGallery = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
        // load galleries on init
        this.loadGalleries();
    }

    /** Load all galleries (all folders) */
    loadGalleries(): void {
        // emit event to load galleries
        this.onLoadGalleries.emit();
    }

    /** create new gallery */
    createGallery(): void {
        UIkit.modal
            .prompt('Name:', '')
            .then(galleryName => {
                // check if user fill gallery name
                if (galleryName) {
                    this.onCreateGallery.emit(galleryName);
                }
            });
    }
}
