import * as Rx from 'rxjs';
import { map, take } from 'rxjs/operators';

// combineAll(project: function): Observable
// When source observable completes use combineLatest with collected observables.
export function combineAll() {
    // emit every 1s, take 2
    const source = Rx.Observable.interval(1000).pipe(
        take(2)
    );

    // map each emitted value from source to interval observable that takes 5 values
    const example = source.pipe(
        map(val => Rx.Observable.interval(1000).pipe(
            map(i => `Result (${val}): ${i}`),
            take(3)
        ))
    );

    // 2 values from source will map to 2 (inner) interval observables that emit every 1s
    // combineAll uses combineLatest strategy, emitting the last value from each
    // whenever either observable emits a value
    const combined = example.combineAll();

    const subscribe = combined.subscribe(val => console.log(val));
}
