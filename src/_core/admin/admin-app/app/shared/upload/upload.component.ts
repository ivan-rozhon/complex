import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';

import { UploadConfig } from './../shared.model';
import { AuthService } from './../../core/auth.service';

import * as UIkit from 'uikit';

@Component({
    selector: 'ca-upload',
    templateUrl: 'upload.component.html'
})

export class UploadComponent implements OnInit, AfterViewInit {
    @ViewChild('upload') uploadElementRef: ElementRef;

    @Input() config: UploadConfig;

    progress: {
        max: number;
        value: number;
        hidden: boolean;
    };

    constructor(
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        // set default values
        this.reset();
    }

    ngAfterViewInit(): void {
        // get auth JWT
        const jwt = this.authService.getAuthHeader();

        // create UIkit upload component after view initialization
        this.initUpload(this.uploadElementRef, jwt);
    }

    // reset internal config to default
    reset(): void {
        // set progress-bar default values
        this.progress = Object.assign({}, {
            max: 100,
            value: 0,
            hidden: true
        });
    }

    /**
     * instantiate UIKit upload component...
     * @param uploadElementRef reference to UIkit upload element
     * @param jwt JSON Web Token
     */
    initUpload(uploadElementRef: ElementRef, jwt: string): void {
        // expose global 'this' for using in inner function scope
        const _this = this;

        // ...via UIkit
        const UIkitUpload = UIkit.upload(uploadElementRef.nativeElement, {
            // UIkit Upload options | https://getuikit.com/docs/upload

            url: this.config.url || '',
            multiple: this.config.multiple || false,

            mime: this.config.mime || false,

            // callback before send files
            beforeSend: function (env) {
                // set auth header if is available
                if (jwt.length) {
                    env.headers = Object.assign({}, {
                        'Authorization': jwt
                    });
                }
            },

            // loading (uploading) functions...

            // uploading started - activate loading bar
            loadStart: function (e) {
                _this.progress.hidden = false;
                _this.progress.max = e.total;
                _this.progress.value = e.loaded;
            },

            // propagate progress via progress bar
            progress: function (e) {
                _this.progress.max = e.total;
                _this.progress.value = e.loaded;
            },

            // still scan the progress of loading
            loadEnd: function (e) {
                _this.progress.max = e.total;
                _this.progress.value = e.loaded;
            },

            // after all completed successfully
            completeAll: function () {
                _this.reset();
            },

            // error functions...

            // like Network Error etc.
            error: function () {
                console.log('error', arguments);
            },

            // If name or MIME type are invalid
            fail: function () {
                console.log('fail', arguments);
            },

            // callback on abort
            abort: function () {
                console.log('abort', arguments);
            }
        });
    }
}
