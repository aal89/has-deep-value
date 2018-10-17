# has-deep-value

Very small (only **184 bytes**), lightweight, tested and dependency free utility function to (deeply) inspect Javascript objects. With **has-deep-value** you can easily check if any object contains a given property at any level deep, accounts for falsey values too. Also includes a curried version and supports object path (dot notation) to keep api usage clear.

## Install

```sh
$ npm install --save has-deep-value
```

## Usage

*Note: use **.hasDeepValue** for the normal function and **.has** for the curried version*

```javascript
const hasDeepValue = require('has-deep-value').hasDeepValue;
 
hasDeepValue({ hello: 'world' }, 'hello'); //-> true
```

Accounts for all values, including all falsey values, e.g.:

* `''`
* `false`
* `NaN`
* `0`
* `undefined`
* `null`

### Typescript

Included is an `index.d.ts` file, Typescript should automatically pick this file up and apply the typings across your codebase.

```typescript
import { hasDeepValue, has } from "has-deep-value";
 
hasDeepValue({ hello: "world" }, "hello"); //-> true
has("hello.world")({ hello: { world: "" } }); //-> true
```

### Examples

#### Default

```js
hasDeepValue({ hello: 'world' }, 'hello'); //-> true
hasDeepValue({ hello: { world: '' } }, 'hello.world'); //-> true
hasDeepValue({ hello: { world: { deep: null } } }, 'hello.world.deep'); //-> true
hasDeepValue({ hello: { world: { deep: () => 100; } } }, 'hello.world.deep'); //-> true

hasDeepValue({ hello: { world: '' } }, 'hello.world.deep'); //-> false

hasDeepValue('', ''); //-> false
hasDeepValue(undefined, 'undefined'); //-> false
hasDeepValue(false, 'false'); //-> false
hasDeepValue(null, 'null'); //-> false
hasDeepValue(0, 'hello'); //-> false
hasDeepValue(NaN, 'world'); //-> false
hasDeepValue(() => {}, 'f'); //-> false
```

#### Functional

```js
const has = require('has-deep-value').has;
const hasHelloWorld = has('hello.world');
```

```js
hasHelloWorld({ hello: { world: '' } }); //-> true
hasHelloWorld({ helloworld: '' }); //-> false

// Etc... the same usage of the default case
```

```js
const objects = [{...}, {...}, {...}];
// Check if all objects conform to { hello: { world: '' } }
if (objects.map(hasHelloWorld).every(e => e)) {
    ...
}
// A different example
if (objects.map(has('account.profile.image')).every(e => e)) {
    ...
}
```

## License
Copyright © 2018, Alex Burghardt. Made available under the MIT license.

