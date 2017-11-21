import * as Rx from 'rxjs';

// fromPromise(promise: Promise, scheduler: Scheduler): Observable
// Create observable from promise, emitting result.
export function fromPromise(): void {
    // example promise that will resolve or reject based on input
    const myPromise = (willReject: any) => {
        return new Promise((resolve, reject) => {
            if (willReject) {
                reject('Rejected!');
            }
            resolve('Resolved!');
        });
    };

    // emit true, then false
    const source = Rx.Observable.of(true, false);
    const example = source
        .mergeMap(val => Rx.Observable
            // turn promise into observable
            .fromPromise(myPromise(val))
            // catch and gracefully handle rejections
            .catch(error => Rx.Observable.of(`Error: ${error}`))
        );

    // output: 'Error: Rejected!', 'Resolved!'
    const subscribe = example.subscribe(val => console.log(val));

}
