import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { apiUrl } from './../../core/data.service';
import { UploadConfig } from '../../shared/shared.model';
import { Image } from '../board.model';

@Component({
    selector: 'ca-board-media-images',
    templateUrl: 'board-media-images.component.html'
})

export class BoardMediaImagesComponent implements OnInit {
    @Input() images: Image[];
    @Input() loading: boolean;
    @Output() onLoadImages = new EventEmitter<any>();
    @Output() onDeleteImage = new EventEmitter<{ mediaType: string; mediaName: string }>();

    uploadConfig: UploadConfig;

    constructor() { }

    ngOnInit(): void {
        // set the configuration of upload component
        this.uploadConfig = {
            url: `${apiUrl}/mediaSave/image`,
            multiple: true,
            mime: 'image/(jpeg|png)'
        };

        // load images on init
        this.loadImages();
    }

    /** get load images */
    loadImages(): void {
        // emit event to load images
        this.onLoadImages.emit();
    }

    /** After upload behavior (actions) */
    uploadComplete(): void {
        // reload images
        this.loadImages();
    }

    /**
     * Delete image by its name
     * @param mediaName name of the image to delete
     */
    deleteImage(mediaName: string): void {
        this.onDeleteImage.emit({ mediaType: 'images', mediaName });
    }
}
