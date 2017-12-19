import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as UIkit from 'uikit';

import { apiUrl } from './../../core/data.service';
import { Gallery, Image } from '../board.model';
import { UploadConfig } from '../../shared/shared.model';

@Component({
    selector: 'ca-media-galleries',
    templateUrl: 'media-galleries.component.html'
})

export class MediaGalleriesComponent implements OnInit {
    selectedGallery: string;
    uploadConfig: UploadConfig;

    @Input() galleries: Gallery[];
    @Input() galleriesLoading: boolean;
    @Input() galleryImages: Image[];
    @Input() galleryImagesLoading: boolean;

    @Output() onLoadGalleries = new EventEmitter<any>();
    @Output() onCreateGallery = new EventEmitter<string>();
    @Output() onDeleteGallery = new EventEmitter<{ mediaType: string; mediaName: string }>();
    @Output() onLoadGalleryImages = new EventEmitter<string>();
    @Output() onDeleteImage = new EventEmitter<{ mediaType: string; mediaName: string, deepMediaName?: string }>();

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

    /**
     * Load images of specific gallery
     * @param galleryName name of gallery with images to load
     */
    loadGalleryImages(galleryName: string): void {
        // emit event to load images
        this.onLoadGalleryImages.emit(galleryName);
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
    selectGallery(galleryName: string): void {
        // set selected gallery
        this.selectedGallery = galleryName;

        // re-set the configuration of upload component
        this.uploadConfig = {
            url: `${apiUrl}/mediaSave/gallery/${galleryName}`,
            multiple: true,
            mime: 'image/(jpeg|png)'
        };

        // load gallery images
        this.loadGalleryImages(galleryName);
    }

    /** After upload images behavior */
    uploadComplete(): void {
        // reload images of current selected gallery
        this.loadGalleryImages(this.selectedGallery);
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

    /**
     * Delete specific image in specific (selected) gallery
     * @param galleryName name of gallery
     * @param galleryImageName name of image to delete
     */
    deleteGalleryImage(galleryName: string, galleryImageName: string): void {
        this.onDeleteImage.emit({ mediaType: 'gallery', mediaName: galleryName, deepMediaName: galleryImageName });
    }
}
