// Learn & Understand Scope
// ---
// four different types of JavaScript scope:
// - global, local, lexical, block

// Block Scope & let, const
// let x = 1;

// {
//     let x = 2;
//     console.log(x); // 2
// }

// console.log(x); // 1

// if (x !== 2) {
//     let x = 2;
//     console.log(x); // 2
// }

// console.log(x); // 1

// Learn & Understand Closures
// ---
// definitions of closures:
// - A closure is a function that has access to the parent scope, even after the scope has closed.
// - A closure is the combination of a function and the lexical environment within which that function was declared.
function speak() {
    const words = 'hi';

    return function logIt() {
        console.log(words);
    };
}

let sayHello = speak();

sayHello();

// ---
function names(n) {
    return function (a) {
        return `${n} likes ${a}`;
    };
}

let j = names('Jacob');
let r = names('Robert');

console.log(j('cheese'));
console.log(r('grapes'));
