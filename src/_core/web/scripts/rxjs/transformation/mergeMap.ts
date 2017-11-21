import * as Rx from 'rxjs';

// mergeMap(project: function: Observable, resultSelector: function: any, concurrent: number): Observable
// Map to observable, emit values.
export function mergeMap() {
    // emit 'Hello'
    const source = Rx.Observable.of('Hello', 'Goodbye');

    // map to inner observable and flatten
    const example = source
        .mergeMap(val => Rx.Observable
            .of(`${val} World!`)
            // unordered - difference between concatMap and mergeMap
            .delayWhen(mergeVal => Rx.Observable.timer(mergeVal === 'Hello World!' ? 1000 : 0))
        );

    // output: 'concatMap: 'Goodbye World!', concatMap: 'Hello World!'
    const subscribe = example
        .subscribe(val => console.log('mergeMap:', val));
}
