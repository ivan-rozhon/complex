import * as Rx from 'rxjs';

// combineLatest(observables: ...Observable, project: function): Observable
// When any observable emits a value, emit the latest value from each.
export function combineLatest() {
    // timerOne emits first value at 1s, then once every 4s
    const timerOne = Rx.Observable.timer(1000, 4000);
    // timerTwo emits first value at 2s, then once every 4s
    const timerTwo = Rx.Observable.timer(2000, 4000);
    // timerThree emits first value at 3s, then once every 4s
    const timerThree = Rx.Observable.timer(3000, 4000);

    // when one timer emits, emit the latest values from each timer as an array
    const combined = Rx.Observable.combineLatest(
        timerOne,
        timerTwo,
        timerThree
    );

    const subscribe = combined.subscribe(latestValues => {
        // grab latest emitted values for timers one, two, and three
        const [timerValOne, timerValTwo, timerValThree] = latestValues;

        console.log(`
            Timer One Latest: ${timerValOne},
            Timer Two Latest: ${timerValTwo},
            Timer Three Latest: ${timerValThree}
        `);
    });
}
