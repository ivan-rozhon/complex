import * as Rx from 'rxjs';

// concatMap(project: function, resultSelector: function): Observable
// Map values to inner observable, subscribe and emit in order.
export function concatMap() {
    // emit 'Hello' and 'Goodbye'
    const source = Rx.Observable.of('Hello', 'Goodbye');

    // map value from source into inner observable, when complete emit result and move to next
    const example = source
        .concatMap(val => Rx.Observable
            .of(`${val} World!`)
            // will be ordered - difference between concatMap and mergeMap
            .delayWhen(concatVal => Rx.Observable.timer(concatVal === 'Hello World!' ? 1000 : 0))
        );

    // output: 'concatMap: 'Hello World!', concatMap: 'Goodbye World!'
    const subscribe = example
        .subscribe(val => console.log('concatMap:', val));
}
