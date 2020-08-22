import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as UIkit from 'uikit';

import { apiUrl } from './../../core/data.service';
import { UploadConfig } from '../../shared/shared.model';
import { Image } from '../board.model';

@Component({
    selector: 'ca-media-images',
    templateUrl: 'media-images.component.html'
})

export class MediaImagesComponent implements OnInit {
    uploadConfig: UploadConfig;

    @Input() images: Image[];
    @Input() loading: boolean;

    @Output() onLoadImages = new EventEmitter<any>();
    @Output() onDeleteImage = new EventEmitter<{ mediaType: string; mediaName: string }>();

    constructor() { }

    ngOnInit(): void {
        // set the configuration of upload component
        this.uploadConfig = {
            url: `${apiUrl}/mediaSave/images`,
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

    /** After upload images behavior */
    uploadComplete(): void {
        // reload images
        this.loadImages();
    }

    /**
     * Delete image by its name
     * @param imageName name of the image to delete
     */
    deleteImage(imageName: string): void {
        // show confirmation dialog before delete
        UIkit.modal
            .confirm(`Delete "${imageName}" image. Are you sure?`)
            .then(() => {
                // emit event to delete image
                this.onDeleteImage.emit({ mediaType: 'images', mediaName: imageName });
            },
            // catch a rejection
            () => { });
    }
}
