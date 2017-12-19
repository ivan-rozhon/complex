import { Injectable } from '@angular/core';

import { Pages, Page } from './board.model';
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
            .get<T>(mediaName ? `mediaLoad/${mediaType}/${mediaName}` : `mediaLoad/${mediaType}`);
    }

    /** Load pages (web schema) */
    loadPages<T>(): Observable<T> {
        return this.dataService
            .get<T>('schemaLoad')
            // parse stringifyed data (so JS can work with them as object)
            .map<any, T>(data => JSON.parse(data));
    }

    /**
     * load page content (data) with template metadata
     * @param dataId ID of data to load
     * @param templateId ID of template
     */
    loadContent<T>(dataId: string, templateId: string): Observable<T> {
        return this.dataService
            .get<T>(`dataLoad/${dataId}/${templateId}`);
    }

    createContent<T>(templateId: string): Observable<T> {
        return this.dataService
            .post<T>(`dataNew`, { templateId });
    }

    /**
     * Save media (gallery - folder, immages)
     * @param mediaType images or gallery
     * @param mediaName name of media (gallery) to save
     */
    saveMedia<T>(mediaType: string, mediaName: string): Observable<T> {
        return this.dataService
            .post<T>(`mediaSave/${mediaType}/${mediaName}`);
    }

    /** Remove image/gallery
     * @param mediaType image or gallery
     * @param mediaName path to media to delete (image/gallery name)
     * @param deepMediaName specific - deep media name (image in gallery)
     */
    removeMedia<T>(mediaType: string, mediaName: string, deepMediaName?: string): Observable<T> {
        return this.dataService
            .get<T>(deepMediaName ? `mediaRemove/${mediaType}/${mediaName}/${deepMediaName}` : `mediaRemove/${mediaType}/${mediaName}`);
    }

    /**
     * update specific property on any level in pages schema
     * @param pages pages schema or pages array or single page item
     * @param indexes indexes representing path to deep item (page)
     * @param propertyName property to update
     * @param propertyValue value of property to update
     * @param firstIteration it is first iteration of this method (first call in recursive calls)
     */
    updatePageItem(
        pages: any, indexes: (number | string)[], propertyName: string, propertyValue: string, isNotFirstIteration?: boolean
    ): any {
        // get next index (first in array) before decreasing indexes array
        const index = indexes[0];

        // get copy of pages schema (first index ever is string name of schema)
        const pagesSchema = typeof index === 'string'
            ? Object.assign({}, pages).webSchema[index]
            : pages;

        // decrease indexes (path) - in every iteration
        indexes.splice(0, 1);

        if (indexes.length > 1) {
            // item to update is somewhere deep in page sub pages - so do another iteration (deeper)
            pagesSchema[indexes[0]].sub = this.updatePageItem(pagesSchema[indexes[0]].sub, indexes, propertyName, propertyValue, true);
        } else {
            // this is exactly the page with searched property - so change the property name
            pagesSchema[indexes[0]][propertyName] = propertyValue;
        }

        // on first iteration return whole pages schema with updated pages 'branch'
        if (!isNotFirstIteration) {
            // assign updated pages 'branch' to original pages object
            pages.webSchema[index] = pagesSchema;

            return pages;
        }

        // otherwise return just updated (inspected) piece of pages 'branch'
        return pagesSchema;
    }
}
