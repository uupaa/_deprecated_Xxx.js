Xxx.js
=========

Xxx.js is awesome.

# Document

https://github.com/uupaa/Xxx.js/wiki/Xxx

# How to use

```js
<script src="lib/Xxx.js">
<script>
// for Browser
console.log( Xxx() );
</script>
```

```js
// for WebWorkers
importScripts("lib/Xxx.js");
console.log( Xxx() );
```

```js
// for Node.js
var Xxx = require("lib/Xxx.js");
console.log( Xxx() );
```

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Xxx.js.git
    $ cd Xxx.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

6. Perf

    http://jsperf.com/uupaa-xxx/


