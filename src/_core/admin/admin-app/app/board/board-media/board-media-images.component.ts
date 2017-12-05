import { Component, OnInit } from '@angular/core';

import { apiUrl } from './../../core/data.service';
import { UploadConfig } from '../../shared/shared.model';

@Component({
    selector: 'ca-board-media-images',
    templateUrl: 'board-media-images.component.html'
})

export class BoardMediaImagesComponent implements OnInit {
    uploadConfig: UploadConfig;

    constructor() { }

    ngOnInit(): void {
        // set the configuration of upload component
        this.uploadConfig = {
            // url: 'http://localhost:8000/file-upload.php',
            url: `${apiUrl}/mediaSave/image`,
            multiple: true,
            mime: 'image/(jpeg|png)'
        };
    }

    /** After upload behavior (actions) */
    uploadComplete(): void {
        console.log('upload complete');

        // TODO... reload images
    }
}
