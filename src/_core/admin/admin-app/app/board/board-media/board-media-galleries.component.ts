import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as UIkit from 'uikit';

import { apiUrl } from './../../core/data.service';
import { Gallery } from '../board.model';
import { UploadConfig } from '../../shared/shared.model';

@Component({
    selector: 'ca-board-media-galleries',
    templateUrl: 'board-media-galleries.component.html'
})

export class BoardMediaGalleriesComponent implements OnInit {
    selectedGallery: string;
    uploadConfig: UploadConfig;

    @Input() galleries: Gallery[];
    @Input() loading: boolean;
    @Output() onLoadGalleries = new EventEmitter<any>();
    @Output() onCreateGallery = new EventEmitter<string>();
    @Output() onDeleteGallery = new EventEmitter<{ mediaType: string; mediaName: string }>();

    constructor() { }

    ngOnInit(): void {
        // load galleries on init
        this.loadGalleries();

        // set the configuration of upload component
        this.uploadConfig = {
            url: `${apiUrl}/mediaSave/gallery/${this.selectedGallery}`,
            multiple: true,
            mime: 'image/(jpeg|png)'
        };
    }

    /** Load all galleries (all folders) */
    loadGalleries(): void {
        // emit event to load galleries
        this.onLoadGalleries.emit();
    }

    /** create new gallery */
    createGallery(): void {
        // show prompt dialog to type name of new gallery
        UIkit.modal
            .prompt('Name:', '')
            .then(galleryName => {
                // check if user fill gallery name
                if (galleryName) {
                    this.onCreateGallery.emit(galleryName);
                }
            });
    }

    /**
     * Select (go to) gallery by name
     * @param galleryName name of gallery
     */
    selectGallery(galleryName: string) {
        // set selected gallery
        this.selectedGallery = galleryName;
    }

    /** After upload images behavior */
    uploadComplete(): void {

    }

    /**
     * Delete gallery by name
     * @param galleryName name of gallery to delete
     */
    deleteGallery(galleryName: string): void {
        // show confirmation dialog before delete
        UIkit.modal
            .confirm(`Delete "${galleryName}" gallery. Are you sure?`)
            .then(() => {
                // emit event to delete gallery
                this.onDeleteGallery.emit({ mediaType: 'gallery', mediaName: galleryName });
            },
            // catch a rejection
            () => { });
    }
}
