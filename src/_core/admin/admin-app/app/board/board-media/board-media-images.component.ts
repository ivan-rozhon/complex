import { Component, OnInit } from '@angular/core';

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
            url: '?api',
            multiple: true,
            mime: 'image/(jpeg|png)'
        };
    }
}
