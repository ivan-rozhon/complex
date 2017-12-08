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
     * @param type is it image or gallery
     * @param gallery name of gallery folder if loading gallery
     */
    loadMedia<T>(type: string, gallery?: string): Observable<T> {
        return this.dataService
            .get(gallery ? `mediaLoad/${type}/${gallery}` : `mediaLoad/${type}`);
    }
}
