(function () {
    return;
    // ╔══════════════════════════╗
    // ║ ECMAScript 2015 Features ║
    // ╚══════════════════════════╝
    // « Arrows and Lexical This »

    let evens = [1, 5, 10, 15],
        fives = [];

    // Expression bodies
    let odds = evens.map(v => v + 1);
    let nums = evens.map((v, i) => v + i);
    let pairs = evens.map(v => ({ even: v, odd: v + 1 }));

    // #LOG
    console.log(`evens ${evens}; odds ${odds}; nums ${nums};`);
    console.log(pairs);

    // Statement bodies
    evens.forEach(v => {
        if (v % 5 === 0)
            fives.push(v);
    });

    // #LOG
    console.log(`fives ${fives}`);

    // Lexical this
    let bob = {
        _name: 'Bob',
        _friends: ['Joe', 'Butch'],
        printFriends() {
            this._friends.forEach(f =>
                console.log(this._name + ' knows ' + f));
        }
    };

    // #LOG
    bob.printFriends();

    // Lexical arguments
    function square() {
        let example = () => {
            let numbers = [];
            for (let number of arguments) {
                numbers.push(number * number);
            }

            return numbers;
        };

        return example();
    }

    // #LOG
    console.log(square(2, 4, 7.5, 8, 11.5, 21));

    // « Classes »

    // « Default + Rest + Spread »

    function f(x, y = 12) {
        // y is 12 if not passed (or passed as undefined)
        return x + y;
    }

    // #LOG
    console.log(f(3));

    function f2(x, ...y) {
        // y is an Array
        return x * y.length;
    }

    // #LOG
    console.log(f2(3, "hello", true));

    function f3(x, y, z) {
        return x + y + z;
    }

    // #LOG
    // Pass each elem of array as argument
    console.log(f3(...[1, 2, 3]));
})();