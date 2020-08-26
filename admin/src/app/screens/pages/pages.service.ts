import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneDeep as _cloneDeep } from 'lodash';

import { DataService } from '@cx/core/services/data.service';

import { Pages, ContentData } from '@cx/shared/types';

@Injectable({ providedIn: 'root' })
export class PagesService {
  constructor(private dataService: DataService) {}

  /** Load pages (web schema) */
  loadPages<T>(): Observable<T> {
    return this.dataService.get<T>('schemaLoad').pipe(
      // parse stringifyed data (so JS can work with them as object)
      map<any, T>((data) => JSON.parse(data))
    );
  }

  /** Save pages (web schema) */
  savePages<T>(pages: Pages): Observable<T> {
    return this.dataService
      .post<T>('schemaSave', { schema: pages })
      .pipe(
        // parse stringifyed data (so JS can work with them as object)
        map<any, T>((data) => JSON.parse(data))
      );
  }

  /**
   * load page content (data) with template metadata
   * @param dataId ID of data to load
   * @param templateId ID of template
   */
  loadContent<T>(dataId: string, templateId: string): Observable<T> {
    return this.dataService.get<T>(`dataLoad/${dataId}/${templateId}`);
  }

  /**
   * create page content (data)
   * @param templateId ID of template
   */
  createContent<T>(templateId: string): Observable<T> {
    return this.dataService.post<T>(`dataNew`, { templateId });
  }

  /**
   * delete page content (data)
   * @param dataId ID of data to delete
   */
  deleteContent<T>(dataId: string): Observable<T> {
    return this.dataService.get<T>(`dataRemove/${dataId}`);
  }

  /**
   * save page content (data)
   * @param dataId ID of data to save (data container - .json file)
   * @param contentData whole data to save
   */
  saveContent<T>(dataId: string, contentData: ContentData): Observable<T> {
    return this.dataService
      .post<T>(`dataSave`, { dataId, contentData })
      .pipe(
        // parse stringifyed data (so JS can work with them as object)
        map<any, T>((data) => JSON.parse(data))
      );
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
    pages: any,
    indexes: (number | string)[],
    propertyName: string,
    propertyValue: string,
    isNotFirstIteration?: boolean
  ): any {
    const indexesCopy = _cloneDeep(indexes);
    const pagesCopy = _cloneDeep(pages);

    // get next index (first in array) before decreasing indexes array
    const index = indexesCopy[0];

    // get copy of pages schema (first index ever is string name of schema)
    const pagesSchema =
      typeof index === 'string'
        ? Object.assign({}, pagesCopy).webSchema[index]
        : pagesCopy;

    // decrease indexes (path) - in every iteration
    indexesCopy.splice(0, 1);

    if (indexesCopy.length > 1) {
      // item to update is somewhere deep in page sub pages - so do another iteration (deeper)
      pagesSchema[indexesCopy[0]].sub = this.updatePageItem(
        pagesSchema[indexesCopy[0]].sub,
        indexesCopy,
        propertyName,
        propertyValue,
        true
      );
    } else {
      // this is exactly the page with searched property - so change the property name
      pagesSchema[indexesCopy[0]][propertyName] = propertyValue;
    }

    // on first iteration return whole pages schema with updated pages 'branch'
    if (!isNotFirstIteration) {
      // assign updated pages 'branch' to original pages object
      pagesCopy.webSchema[index] = pagesSchema;

      return pagesCopy;
    }

    // otherwise return just updated (inspected) piece of pages 'branch'
    return pagesSchema;
  }
}
