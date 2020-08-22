import * as Rx from 'rxjs';

// pairwise(): Observable<Array>
// Emit the previous and current values as an array.
export function pairwise() {
    const interval = Rx.Observable.interval(1000);

    // Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
    interval.pairwise()
        .take(5)
        .subscribe(console.log);
}
