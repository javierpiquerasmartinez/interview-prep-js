JAVASCRIPT SENIOR INTERVIEW CONCEPT EXERCISES
==============================================

6 comprehensive JavaScript concept files for senior-level interview preparation.
Each file contains multiple exercises with explanations and tests that all pass.

FILES:
------

01-event-loop.js (5.4 KB)
  - Event Loop basics
  - Predict output with setTimeout, Promise.resolve, async/await
  - 4 exercises with increasing difficulty
  - Key: Call Stack -> Microtasks -> Macrotasks

02-closures.js (6.9 KB)
  - Classic for-loop closure bug (var vs let, IIFE)
  - Private variables with closures
  - Function factories (higher-order functions)
  - Memoization using closures
  - 5 exercises covering closure patterns

03-this-keyword.js (6.8 KB)
  - Regular functions vs arrow functions
  - The lost 'this' problem in callbacks
  - bind, call, apply usage
  - Method borrowing
  - 'this' in class methods
  - 6 exercises with increasing complexity

04-prototypes.js (7.7 KB)
  - Prototype chain and Object.create
  - Object.create vs ES6 class equivalence
  - Prototypical inheritance patterns
  - Modifying prototypes safely
  - Property lookup and hasOwnProperty
  - 6 exercises on prototype-based patterns

05-promises-async.js (8.3 KB)
  - Promise.all, Promise.race, Promise.allSettled
  - Sequential vs parallel execution
  - Error handling with try/catch and .catch()
  - Implementing Promise.all from scratch
  - async/await in loops
  - 7 exercises on async patterns

06-advanced-patterns.js (9.7 KB)
  - Debounce (event handling optimization)
  - Throttle (frequency limiting)
  - Curry function (partial application)
  - Deep Clone (recursive copying with cycle detection)
  - Array.flat implementation
  - Memoize decorator (caching)
  - Partial application
  - 7 implementations expected to code from scratch

RUNNING THE EXERCISES:
---------------------

Run all files individually with Node.js:
  node 01-event-loop.js
  node 02-closures.js
  node 03-this-keyword.js
  node 04-prototypes.js
  node 05-promises-async.js
  node 06-advanced-patterns.js

Or run all at once:
  for f in *.js; do echo "=== $f ==="; node "$f"; done

FORMAT:
-------

Each file contains:
  - Spanish concept explanation (CONCEPTO)
  - Multiple labeled exercises (Ejercicio 1, 2, etc.)
  - Working code with predictions to solve
  - Detailed explanations of the "why"
  - runTests() function at the end that validates implementations
  - All tests pass when run with Node.js

NO BROWSER DEPENDENCIES - Pure Node.js code suitable for interviews

These are NOT algorithm problems but JavaScript language fundamentals
that senior engineers are expected to understand deeply and be able
to implement/explain in interviews.

KEY CONCEPTS COVERED:
--------------------

1. Asynchronicity - Event loop, microtasks, macrotasks
2. Scope - Closures, capture, memory management
3. Context - 'this' binding, arrow functions, method borrowing
4. Prototypes - Inheritance, Object.create, class equivalence
5. Async Patterns - Promises, Promise utilities, async/await
6. Advanced Utilities - Debounce, throttle, curry, memoize, deep clone

TOTAL: 44 KB of exercise code with explanations and working tests
