import * as Rx from 'rxjs';

// forkJoin(...args, selector : function): Observable
// When all observables complete, emit the last value from each.
export function forkJoin() {
    const myPromise = (val: any) => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000));

    /*
      when all observables complete, give the last
      emitted value from each as an array
    */
    const example = Rx.Observable.forkJoin(
        // emit 'Hello' immediately
        Rx.Observable.of('Hello'),
        // emit 'World' after 1 second
        Rx.Observable.of('World').delay(1000),
        // emit 'Goodbye', 'World' immediately
        Rx.Observable.of('Goodbye', 'World'),
        // emit 0 after 1 second
        Rx.Observable.interval(1000).take(1),
        // emit 0...1 in 1 second interval
        Rx.Observable.interval(1000).take(2),
        // promise that resolves to 'Promise Resolved' after 5 seconds
        myPromise('RESULT')
    );
    // output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
    const subscribe = example.subscribe(val => console.log(val));
}
