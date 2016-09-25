# deferred
Small deferred library (just a class) built on ES6 Promise implementation

## Intro
This deferred class `extends Promise` to create deferred functionality. A `Deferred` object is a `Promise` and can be used as such. This library was built for environments (specifically node.js) where ECMAScript 6 features are available, including `class`, `Promise`, `let`, and arrow functions.

## Usage
```js
let Deferred = require('promise-be-deferred');
let d = new Deferred();

d instanceof Deferred; // true
d instanceof Promise; // true
```

## Deferred specific API
The `Deferred` class adds the following, which does not exist on `Promise`.

### `d.promise()`
Returns a new Promise that resolves when Deferred does.

### `d.resolve(value)`
Resolves the Deferred with `value`.

### `d.reject(value)`
Rejects the Deferred with `value`.

## Inherited from Promise
The `Deferred` class inherits the following with out modification from `Promise`.

### `d.then(onFulfilled, onRejected)`
Adds handlers for when the deferred is fulfilled, rejected, or both.

### `d.catch(onRejected)`
Adds a handler for when the deferred is rejected, or an error occurs.

## License
MIT
