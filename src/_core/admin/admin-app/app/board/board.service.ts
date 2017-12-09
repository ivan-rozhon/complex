import { Injectable } from '@angular/core';

import { DataService } from '../core/data.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BoardService {

    constructor(
        private dataService: DataService
    ) { }

    /**
     * Load images/gallery images
     * @param mediaType images or gallery
     * @param galleryName name of gallery folder if loading gallery
     */
    loadMedia<T>(mediaType: string, galleryName?: string): Observable<T> {
        return this.dataService
            .get(galleryName ? `mediaLoad/${mediaType}/${galleryName}` : `mediaLoad/${mediaType}`);
    }

    /** Remove image/gallery
     * @param mediaType image or gallery
     * @param path path to image to delete (image/gallery name)
     */
    removeMedia<T>(mediaType: string, path: string): Observable<T> {
        return this.dataService
            .get(`mediaRemove/${mediaType}/${path}`);
    }
}
