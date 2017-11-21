import * as Rx from 'rxjs';

// zip(observables: *): Observable
// After all observables emit, emit values as an array
// This will continue until at least one inner observable completes.
export function zip() {
    const sourceOne = Rx.Observable.of('Hello', 'World', 'Goodbye');
    // emit every 1s
    const interval = Rx.Observable.interval(1000);

    // when one observable completes no more values will be emitted
    const example = Rx.Observable
        .zip(
        sourceOne,
        interval,
        interval.take(2)
        );

    // output: ["Hello", 0, 0]...["World", 1, 1]
    const subscribe = example.subscribe(val => console.log(val));
}
