import * as Rx from 'rxjs';

// distinctUntilChanged(compare: function): Observable
// Only emit when the current value is different than the last.
export function distinctUntilChanged() {
    // only output distinct values, based on the last emitted value
    const myArrayWithDuplicatesInARow = Rx.Observable
        .from([1, 1, 2, 2, 3, 1, 2, 3]);

    const distinctSub = myArrayWithDuplicatesInARow
        .distinctUntilChanged()
        // output: 1,2,3,1,2,3
        .subscribe(val => console.log('DISTINCT SUB:', val));

    const nonDistinctSub = myArrayWithDuplicatesInARow
        // output: 1,1,2,2,3,1,2,3
        .subscribe(val => console.log('NON DISTINCT SUB:', val));
}
