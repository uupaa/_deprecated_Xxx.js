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
    $ ../Xxx.js/clone.js [-js | -ts]
    ```
 */

var fs = require("fs");
var argv = process.argv.slice(2);
var options = _parseCommandLineOptions(argv, {
        js: true,  // Boolean: true is JavaScript mode
        ts: false  // Boolean: true is TypeScript mode
    });

var _;
var repositoryFullName = process.cwd().split("/").pop();                               // "Foo.js"
var repositoryName     = (_ = repositoryFullName.split("."), _.pop(), _.join("."));    // "Foo"
var from               = (_ = process.argv[1].split("/"), _.pop(), _.join("/")) + "/"; // ".../Xxx.js"
var to                 = process.cwd() + "/";

function clone(from,           // @arg String: copy from.
               to,             // @arg String: copy to.
               repositoryName, // @arg String: repository name. eg: "Foo"
               tree) {         // @arg Object: source tree.

    for (var node in tree) {    // node  are "lib", "Xxx.js", ...
        var value = tree[node]; // value are { ... }, [false], [false, "ts.index.html"]

        if (Array.isArray(value)) {
            var overwrite  = value[0];
            var sourceName = value[1] || node;

            // replace node name.
            //      "Xxx.js" -> "Foo.js"
            var targetName = node.replace(/Xxx/g, repositoryName).
                                  replace(/xxx/g, repositoryName.toLowerCase());
            // already exists?
            var exists = fs.existsSync(to + targetName);

            if (overwrite || !exists) {
                if (overwrite) {
                    console.log("  overwrite: " + to + targetName);
                } else if (!exists) {
                    console.log("  clone: " + to + targetName);
                }
                var data = fs.readFileSync(from + sourceName, "UTF-8").replace(/Xxx/g, repositoryName).
                                                                       replace(/xxx/g, repositoryName.toLowerCase());
                fs.writeFileSync(to + targetName, data);
            }
        } else { // Object -> Tree -> mkdir
            if (!fs.existsSync(to + node)) {
                console.log("  mkdir: " + to + node + "/");
                fs.mkdirSync(to + node);
            }
            clone(from + node + "/", to + node + "/", repositoryName, tree[node]);
        }
    }
}

if (options.js) {
    clone(from, to, repositoryName, {
         // tree                   overwrite, source name
            "lib": {
                "Xxx.js":           [false],
            },
            "lint": {
                "plato.js":         [false],
                "plato": {
                }
            },
            "test": {
                "index.html":       [false],
                "index.node.js":    [false],
                "test.js":          [false],
            },
            ".gitignore":           [true],
            ".jshintrc":            [true],
            ".npmignore":           [true],
            "index.js":             [false],
            "LICENSE":              [false],
            "package.json":         [false],
            "README.md":            [false]
        });
} else if (options.ts) {
    clone(from, to, repositoryName, {
         // tree                   overwrite, source name
            "lib": {
                "Xxx.ts":           [false, "Xxx.ts"],
            },
            "lint": {
                "plato.js":         [false],
                "plato": {
                }
            },
            "test": {
                "index.html":       [false, "ts.index.html"],
                "index.node.js":    [false, "ts.index.node.js"],
                "test.js":          [false],
            },
            ".gitignore":           [true,  ".gitignore"],
            ".jshintrc":            [true,  ".jshintrc"],
            ".npmignore":           [true,  ".npmignore"],
            "index.js":             [false],
            "LICENSE":              [false],
            "package.json":         [false, "ts.package.json"],
            "README.md":            [false, "ts.README.md"]
        });
}

function _parseCommandLineOptions(argv,      // @arg CommandlineOptionsArray: argv. [option, ...]
                                  options) { // @arg Object: { ... }
    for (var i = 0, iz = argv.length; i < iz; ++i) {
        switch (argv[i]) {
        case "-js":
        case "--javascript":
            options.js = true;
            options.ts = false;
            break;
        case "-ts":
        case "--typescript":
            options.js = false;
            options.ts = true;
            break;
        }
    }
    return options;
}

