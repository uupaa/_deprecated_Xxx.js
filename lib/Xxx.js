// @name: Xxx.js
// @require: Valid.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
//{@assert
var Valid = global["Valid"] || require("uupaa.valid.js");
//}@assert

var _inNode = "process" in global;
var _inWorker = "WorkerLocation" in global;
var _inBrowser = "self" in global;

// --- define ----------------------------------------------
// --- interface -------------------------------------------
function Xxx() { // @help: Xxx
}
Xxx["name"] = "Xxx";
Xxx["repository"] = "https://github.com/uupaa/Xxx.js";

// --- implement -------------------------------------------

//{@assert
function _if(value, msg) {
    if (value) {
        console.error(Valid.stack(msg));
        throw new Error(msg);
    }
}
//}@assert

// --- export ----------------------------------------------
//{@node
if (_inNode) {
    module["exports"] = Xxx;
}
//}@node
if (global["Xxx"]) {
    global["Xxx_"] = Xxx; // already exsists
} else {
    global["Xxx"]  = Xxx;
}

})((this || 0).self || global);

