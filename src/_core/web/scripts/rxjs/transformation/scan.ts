import * as Rx from 'rxjs';

// scan(accumulator: function, seed: any): Observable
// Reduce over time.
export function scan() {
    // Accumulate values in an array, emit random values from this array.
    const scanObs = Rx.Observable.interval(1000)
        .scan((a, c) => a.concat(c), [])
        .map(r => r[Math.floor(Math.random() * r.length)])
        .distinctUntilChanged()
        .subscribe(console.log);
}
