// babel-polyfill (includes a custom regenerator runtime and core-js)
import './modules/polyfill';

// « Modules #1/2 »
import * as es6 from './modules/es6-module';
import { MAX_USERS, MAX_REPLIES } from './modules/es6-module';
import { FlashMessage } from './modules/es6-module';

(() => {
    // return;
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

    console.log(r({ x: 1, y: 2 }));

    // « Object.assign »
    function countdownTimer(target, timeleft, options = {}) {
        // default value of "options" parameter
        let defaults = {
            container: '.timer-display',
            timeUnit: 'seconds'
        };

        // merge options and defaults by Object.assing method
        let settings = Object.assign({}, defaults, options);

        console.log(settings.container);
        console.log(settings.timeUnit);
    }

    countdownTimer($('.btn-undo'), 60, { container: '.new-post-options' });

    // « Arrays »
    let users = ['Sam', 'Tyler', 'Brook'];

    // Array destructuring
    let [a, , b] = users;
    console.log(a, b);

    // ... with Rest params
    let [firstUser, ...rest] = users;
    console.log(firstUser, rest);

    // Using for...of to loop over arrays
    for (let user of users) {
        console.log(user);
    }

    // Check if object is iterable by Symbol.iterator
    console.log(typeof users[Symbol.iterator]); // > function
    console.log(typeof user[Symbol.iterator]); // > undefined

    // Finding an element in an array - find() method
    let users2 = [
        { login: 'Sam', admin: false },
        { login: 'Brook', admin: true },
        { login: 'Tyler', admin: true }
    ];

    let admin = users2.find(user => {
        return user.admin;
    });
    // or shorter way
    let admin2 = users2.find(user => user.admin);

    console.log(admin, admin2);

    // « Maps »
    // Map
    let mapSettings = new Map();

    mapSettings.set('user', 'Sam');
    mapSettings.set('topic', 'ES2015');
    mapSettings.set('replies', ['Cant`t wait!', 'So Cool']);

    // Iterating map
    for (let [key, value] of mapSettings) {
        console.log(`${key} = ${value}`);
    }

    // Weakmap
    // - only objects can be passed as keys
    // - not iterable
    let user2 = {};

    let mapSettings2 = new WeakMap();
    mapSettings2.set(user2, 'ES2015');

    console.log(mapSettings2.get(user2));
    console.log(mapSettings2.has(user2));
    console.log(mapSettings2.delete(user2));

    // « Sets »
    // - stores unique values of any type
    // - iterable
    let tags = new Set();

    tags.add('JavaScript');
    tags.add('Programming');
    tags.add({ version: '2015' });
    tags.add('Web');

    // Using for...of to loop over set
    for (let tag of tags) {
        console.log(tag);
    }

    // Array destructuring
    let [d, e, g, h] = tags;
    console.log(d, e, g, h);

    // Weakset
    // - only object are allowed to be stored
    // - not iterable
    let weakTags = new WeakSet();

    weakTags.add({ name: 'JavaScript' });
    let iOS = { name: 'iOS' };
    weakTags.add(iOS);

    console.log(weakTags.has(iOS));
    console.log(weakTags.delete(iOS));

    // « Classes »
    class Widget {
        constructor() {
            this.baseCSS = 'site-widget';
        }

        parse(value) {
            return `${value} - class: ${this.baseCSS}`;
        }

        parse2(value) {
            return value;
        }
    }

    // Using extends to inherit from base class
    class SponsorWidget extends Widget {
        constructor(name, description, url) {
            // runs parent`s setup code
            super();

            // use this to access instance properties
            this.url = url;
            this.name = name;
            this.description = description;
        }

        render() {
            // use this to access instance methods
            let link = this._buildLink(this.url);
            console.log(link);

            // inherits methods
            let parsedName = this.parse(this.name);
            console.log(parsedName);

            // inherits properties
            let css = this._buildLink(this.baseCSS);
            console.log(css);
        }

        parse2() {
            // Calls the parent version of parse2() method
            let parsedName = super.parse2(this.name);
            return `Sponsor: ${parsedName}`;
        }

        // prefixing a method with an underscore is a convention for indicating
        // that it should not be invoked from the public API (= private function)
        _buildLink(url) {
            return url;
        }
    }

    let sponsorWidget = new SponsorWidget('Promo Add', 'This is sponsor widget!', 'http://rozhon.net/');
    sponsorWidget.render();
    console.log(sponsorWidget.parse2());

    // « Modules #2/2 »
    es6.logMessage(`es6-module.js`);

    console.log(`MAX_USERS: ${MAX_USERS}, MAX_REPLIES: ${MAX_REPLIES}`);

    let flash = new FlashMessage('Hello');
    flash.renderLog();

    // « Promises »
    function getPoolResultsFromServer(poolName) {

        return new Promise((resolve, reject) => {
            let url = `${location.protocol}//${location.host}/?api/${poolName}`;
            let request = new XMLHttpRequest();
            request.open('GET', url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(new Error(request.status));
                }
            };

            request.onerror = () => {
                reject(new Error("Error Fetching Results"));
            };

            request.send();
        });
    }

    function filterResults(results) {
        return results.filter(results => results.city === 'Prague');
    }

    let ui = {
        // method initializer shorthand
        logResults(filterResults) {
            console.log(filterResults);
        }
    };

    getPoolResultsFromServer('es6')
        .then(filterResults)
        .then(ui.logResults)
        .catch(error => {
            console.log(`Error: ${error}`);
        });

    // « Iterators »
    // iterate over plain JS object
    let post = {
        title: 'New Features in JS',
        replies: 19
    };

    // Iterator object function
    post[Symbol.iterator] = function () {

        let properties = Object.keys(this);
        let count = 0;
        let isDone = false;

        let next = () => {
            // Ends the loop after reaching the last property
            if (count >= properties.length) {
                isDone = true;
            }
            // keyword 'this' refers to the post object
            return { done: isDone, value: this[properties[count++]] };
        };

        return { next };
    };

    // iterate over object using for...of loop
    for (let p of post) {
        console.log(p);
    }

    // ...or with the spread operator
    let values = [...post];
    console.log(values);

    // ...or with destructuring
    let [title, replies] = post;
    console.log(`title: ${title}, replies: ${replies}`);

    // « Generators »
    let post2 = {
        title: 'New Features in JS: Generators',
        replies: 20
    };

    // Generator function
    post2[Symbol.iterator] = function *() {

        let properties = Object.keys(this);
        for (let p of properties) {
            // each time 'yield' is called, function returns a new iterator object:
            // { done: boolean, value: any }
            yield this[p];
        }
    };

    // iterate over object using for...of loop
    for (let p of post2) {
        console.log(p);
    }

})();