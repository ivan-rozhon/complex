import * as Rx from 'rxjs';

// concat(observables: ...*): Observable
// Subscribe to observables in order as previous completes, emit values.
export function concat() {
    // emits 1,2,3
    const sourceOne = Rx.Observable.of(1, 2, 3);
    // emits 4,5,6
    const sourceTwo = Rx.Observable.of(4, 5, 6);

    // sourceTwo waits on sourceOne to complete before subscribing
    // in order - difference between concat and merge
    const example = Rx.Observable.concat(
        sourceOne.delay(3000),
        sourceTwo
    );

    // output: 1,2,3,4,5,6
    const subscribe = example.subscribe(val => console.log('Example: Delayed source one:', val));
}
