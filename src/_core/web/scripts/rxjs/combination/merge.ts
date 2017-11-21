import * as Rx from 'rxjs';

// merge(input: Observable): Observable
// Turn multiple observables into a single observable.
export function merge() {
    // emit every 2.5 seconds
    const first = Rx.Observable.interval(2500);
    // emit every 2 seconds
    const second = Rx.Observable.interval(2000);
    // emit every 1.5 seconds
    const third = Rx.Observable.interval(1500);
    // emit every 1 second
    const fourth = Rx.Observable.interval(1000);

    // emit outputs from one observable
    // unordered - difference between concat and merge
    const example = Rx.Observable.merge(
        first.mapTo('FIRST!'),
        second.mapTo('SECOND!'),
        third.mapTo('THIRD'),
        fourth.mapTo('FOURTH')
    );

    // output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
    const subscribe = example.subscribe(val => console.log(val));
}
