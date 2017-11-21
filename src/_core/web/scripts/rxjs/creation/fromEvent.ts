import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';

// fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable
// Turn event into observable sequence.
export function fromEvent() {
    // create observable that emits click events
    const source = Rx.Observable.fromEvent(document, 'click');

    // map to string with given event timestamp
    const example = source.pipe(
        map((event: Event) => `Event time: ${event.timeStamp}`)
    );

    // output (example): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe(val => console.log(val));
}
