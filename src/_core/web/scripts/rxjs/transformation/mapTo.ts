import * as Rx from 'rxjs';

// mapTo(value: any): Observable
// Map emissions to constant value.
export function mapTo() {
    // emit every click on document
    const source = Rx.Observable.fromEvent(document, 'click');

    // map all emissions to one value
    const example = source.mapTo('GOODBYE WORLD!');

    // output: (click)'GOODBYE WORLD!'...
    const subscribe = example.subscribe(val => console.log(val));
}
