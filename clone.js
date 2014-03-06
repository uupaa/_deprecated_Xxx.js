#!/usr/bin/env node

/*
# Usage:

1. Clone Xxx.js to your work space, and add permission to the clone command.

    ```sh
    $ git clone git@github.com:uupaa/Xxx.git
    $ chmod +x Xxx.js/clone.js
    ```

2. Create new repository 'Foo.js' in the GitHub and clone it.

    ```sh
    $ git clone git@github.com:uupaa/Foo.js.git
    $ cd Foo.js
    ```

3. Execute clone command.

    ```sh
    $ pwd
    > Foo.js
    $ rm README.md LICENSE
    $ ../Xxx.js/clone.js
    ```
 */

var fs = require("fs");

var _;
var repository = process.cwd().split("/").pop();                         // "Foo.js"
var name = (_ = repository.split("."), _.pop(), _.join("."));            // "Foo"
var from = (_ = process.argv[1].split("/"), _.pop(), _.join("/")) + "/"; // ".../Xxx.js"
var to   = process.cwd() + "/";

function clone(from, to, name, tree) {

    for (var node in tree) {
        var value = tree[node];

        switch (typeof value) {
        case "boolean":
            var rename = node.replace(/Xxx/g, name).
                              replace(/xxx/g, name.toLowerCase());
            var overwrite = value;
            var exists = fs.existsSync(to + rename);

            if (overwrite || !exists) {
                if (overwrite) {
                    console.log("  overwrite: " + to + rename);
                } else if (!exists) {
                    console.log("  clone: " + to + rename);
                }
                var data = fs.readFileSync(from + node, "UTF-8").replace(/Xxx/g, name).
                                                                 replace(/xxx/g, name.toLowerCase());
                fs.writeFileSync(to + rename, data);
            }
            break;
        case "object":
            if (!fs.existsSync(to + node)) {
                console.log("  mkdir: " + to + node + "/");
                fs.mkdirSync(to + node);
            }
            clone(from + node + "/", to + node + "/", name, tree[node]);
        }
    }
}

clone(from, to, name, {
        "lib": {
            "Xxx.js":   false
        },
        "lint": {
            "plato": {
            }
        },
        "test": {
            "index.html": false,
            "index.node.js": false,
            "test.js":  false
        },
        ".gitignore":   false,
        ".jshintrc":    false,
        ".npmignore":   false,
        "index.js":     false,
        "LICENSE":      false,
        "package.json": false,
        "README.md":    false
    });

