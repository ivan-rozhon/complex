import { Injectable } from '@angular/core';

import { cloneDeep as _cloneDeep } from 'lodash';

@Injectable({ providedIn: 'root' })
export class SharedService {
  constructor() {}

  /**
   * move specific item (by index) in array to another index
   * @param array array to reorder
   * @param fromIndex old (original) index of item to move
   * @param toIndex new (requested) index of moved item
   */
  // http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
  moveArrayItem(array: any[], fromIndex: number, toIndex: number): any[] {
    // first, create a deep copy (new referece) of array
    const arrayToModify = _cloneDeep(array);

    // do the magic to move item by index with splice() method
    arrayToModify.splice(toIndex, 0, arrayToModify.splice(fromIndex, 1)[0]);

    // return reordered array with new reference
    return arrayToModify;
  }

  /**
   * remove one specific item in array
   * @param array array to work with
   * @param index index of item to remove
   */
  removeArrayItem(array: any[], index: number): any[] {
    // first, create a deep copy (new referece) of array
    const arrayToModify = _cloneDeep(array);

    // remove nth item in array
    arrayToModify.splice(index, 1);

    // return new array without requested item to remove
    return arrayToModify;
  }
}
