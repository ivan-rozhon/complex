import * as Rx from 'rxjs';

// pluck(properties: ...args): Observable
// Select properties to emit.
export function pluck() {
    const source = Rx.Observable.from([
        { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
        { name: 'Sarah', age: 35, job: { title: 'Architect', language: 'Java' } }
    ]);

    // grab nested properties
    const example = source.pluck('job', 'title');

    // output: "Developer", "Architect"
    const subscribe = example.subscribe(val => console.log(val));
}
