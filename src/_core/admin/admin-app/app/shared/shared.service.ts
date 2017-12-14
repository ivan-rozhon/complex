import { Injectable } from '@angular/core';

import * as _ from 'lodash/lodash';

@Injectable()
export class SharedService {

    constructor() { }

    /**
     * move specific item (by index) in array to another index
     * @param array array to reorder
     * @param fromIndex old (original) index of item to move
     * @param toIndex new (requested) index of moved item
     */
    // http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    moveArrayItem(array: any[], fromIndex: number, toIndex: number): any[] {
        // do the magic to move item by index with splice() method
        array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);

        // return reordered array with new reference
        return _.cloneDeep(array);
    }
}
