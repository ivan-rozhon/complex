import * as Rx from 'rxjs';

// mergeAll(concurrent: number): Observable
// Collect and subscribe to all observables.
export function mergeAll() {
    const interval = Rx.Observable.interval(500).take(3);

    /*
      interval is emitting a value every 0.5s. This value is then being mapped to interval that
      is delayed for 1.0s. The mergeAll operator takes an optional argument that determines how
      many inner observables to subscribe to at a time. The rest of the observables are stored
      in a backlog waiting to be subscribe.
    */
    const example = interval
        .do(i => console.log(`interval number: ${i}`))
        .map(val => interval.delay(1000).take(3))
        .mergeAll(2)
        .subscribe(console.log);
    /*
      The subscription is completed once the operator emits all values.
    */

    // without 'concurrent'
    // 5 1 5 2 5 3 5 4 (seconds -> 5 means .5)
    // 0-1-2-x
    // |-x-x-0-1-2
    // x-|-x-x-0-1-2
    // x-x-|-x-x-0-1-2
    // ...
    // (it can be in different order)
    // -> 0 10 210 21 2

    // with 'concurrent' 2 (only two observables)
    // without 'concurrent'
    // 5 1 5 2 5 3 5 4
    // 0-1-2-x
    // |-x-x-0-1-2
    // x-|-x-x-0-1-2
    // ...
    // -> 0 10 21 2
    // third observable subscribes after previous observables complete
    // -> 0 1 2

    // debug log
    const timer = Rx.Observable.interval(500).map(val => `${(val + 1) * 500} ms`).take(11).subscribe(console.log);
}
