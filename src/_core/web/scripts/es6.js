(function () {
    return;
    // ╔══════════════════════════╗
    // ║ ECMAScript 2015 Features ║
    // ╚══════════════════════════╝
    // « Arrows and Lexical This »

    let evens = [1, 5, 10, 15],
        fives = [];

    // ═ Expression bodies ═
    let odds = evens.map(v => v + 1);
    let nums = evens.map((v, i) => v + i);
    let pairs = evens.map(v => ({ even: v, odd: v + 1 }));

    console.log(`evens ${evens}; odds ${odds}; nums ${nums};`);
    console.log(pairs);

    // Statement bodies
    evens.forEach(v => {
        if (v % 5 === 0)
            fives.push(v);
    });

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

    console.log(square(2, 4, 7.5, 8, 11.5, 21));

    // « Classes »

    // « Default + Rest + Spread »

    function f(x, y = 12) {
        // y is 12 if not passed (or passed as undefined)
        return x + y;
    }

    console.log(f(3));

    function f2(x, ...y) {
        // y is an Array
        return x * y.length;
    }

    console.log(f2(3, "hello", true));

    function f3(x, y, z) {
        return x + y + z;
    }

    // Pass each elem of array as argument
    console.log(f3(...[1, 2, 3]));

    // « Destructuring & Template Strings » (Objects and Strings)
    let name = 'Sam';
    let age = 45;

    // Object Initializer Shorthand
    let user = { name, age };

    console.log(`user name: ${user.name}`);
    console.log(`user age: ${user.age}`);

    function buildUser(first, last, postCount) {
        // Template Strings
        let fullName = `${first} ${last}`;
        const ACTIVE_POST_COUNT = 10;

        return {
            first,
            last,
            fullName,
            // Method Initializer Shorthand
            isActive() {
                return postCount >= ACTIVE_POST_COUNT;
            }
        };
    }

    // Object destructuring
    let { first, fullName, isActive } = buildUser('Sam', 'Williams', 20);

    console.log(first);
    console.log(fullName);
    console.log(isActive());

    // Unescaped template strings
    console.log(String.raw`In ES5 "\n" is a line-feed.`);

    // Destructuring + defaults arguments
    function r({ x, y, w = 10, h = 10 }) {
        return x + y + w + h;
    }

    console.log(r({x:1, y:2}));

})();