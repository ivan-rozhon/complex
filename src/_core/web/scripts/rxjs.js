(() => {
    // ╔═══════════════╗
    // ║ RxJS Features ║
    // ╚═══════════════╝

    // « map(project: Function, thisArg: any): Observable »
    // Apply projection with each value from source.
    // ___
    // emit (1,2,3,4,5)
    const sourceMap = Rx.Observable.from([1, 2, 3, 4, 5]);
    // add 10 to each value
    const exampleMap = sourceMap.map(val => val + 10);
    // output: 11,12,13,14,15
    const subscribeMap = exampleMap.subscribe(val => console.log(val));

    // « pluck(properties: ...args): Observable »
    // Select properties to emit.
    // ___
    const sourcePluck = Rx.Observable.from([
        { name: 'Joe', age: 30 },
        { name: 'Sarah', age: 35 }
    ]);
    // grab names
    const examplePluck = sourcePluck.pluck('name');
    // output: "Joe", "Sarah"
    const subscribePluck = examplePluck.subscribe(val => console.log(val));
})();