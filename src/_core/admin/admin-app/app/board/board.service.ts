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
     * @param mediaName name of media (gallery) folder if loading specific gallery
     */
    loadMedia<T>(mediaType: string, mediaName?: string): Observable<T> {
        return this.dataService
            .get(mediaName ? `mediaLoad/${mediaType}/${mediaName}` : `mediaLoad/${mediaType}`);
    }

    /** Load pages (web schema) */
    loadPages<T>(): Observable<T> {
        return this.dataService
            .get('schemaLoad');
    }

    /**
     * Save media (gallery - folder, immages)
     * @param mediaType images or gallery
     * @param mediaName name of media (gallery) to save
     */
    saveMedia<T>(mediaType: string, mediaName: string): Observable<T> {
        return this.dataService
            .post(`mediaSave/${mediaType}/${mediaName}`);
    }

    /** Remove image/gallery
     * @param mediaType image or gallery
     * @param mediaName path to media to delete (image/gallery name)
     * @param deepMediaName specific - deep media name (image in gallery)
     */
    removeMedia<T>(mediaType: string, mediaName: string, deepMediaName?: string): Observable<T> {
        return this.dataService
            .get(deepMediaName ? `mediaRemove/${mediaType}/${mediaName}/${deepMediaName}` : `mediaRemove/${mediaType}/${mediaName}`);
    }
}
