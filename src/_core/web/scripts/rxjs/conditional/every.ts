import * as Rx from 'rxjs';

// every(predicate: function, thisArg: any): Observable
// If all values pass predicate before completion emit true, else false.
export function every() {
    // emit 5 values
    const source = Rx.Observable.of(1, 2, 3, 4, 5);

    const example = source
        // is every value even?
        .every(val => val % 2 === 0);

    // output: false
    const subscribe = example.subscribe(console.log);
}
