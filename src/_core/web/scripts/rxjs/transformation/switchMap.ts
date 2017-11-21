import * as Rx from 'rxjs';

// switchMap(project: function: Observable, resultSelector: function(outerValue, innerValue, outerIndex, innerIndex): any): Observable
// Map to observable, complete previous inner observable, emit values.
export function switchMap() {
    // emit immediately, then every 5s
    const source = Rx.Observable.timer(0, 5000);

    // switch to new inner observable when source emits, emit items that are emitted
    const example = source.switchMap(() => Rx.Observable.interval(500));

    // output: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
    const subscribe = example.subscribe(val => console.log(val));
}
