import * as Rx from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

// race(): Observable
// The observable to emit first is used.
export function race() {
    // take the first observable to emit
    const example = Rx.Observable.race(
        // emit every 1.5s
        Rx.Observable.interval(1500).mapTo('loses, too slow'),
        // emit every 1s
        Rx.Observable.interval(1000).mapTo('1s won!'),
        // emit every 2s
        Rx.Observable.interval(2000).mapTo('loses, too slow'),
        // emit every 2.5s
        Rx.Observable.interval(2500).mapTo('loses, too slow')
    );

    // output: "1s won!"..."1s won!"...etc
    const subscribe = example.subscribe(val => console.log(val));
}
