// @name: Xxx.js

(function(global) {
"use strict";

// --- variable --------------------------------------------
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
function _type(value, types, keys) {
    return types.split(/[\|\/]/).some(judge);

    function judge(type) {
        switch (type.toLowerCase()) {
        case "omit":    return value === undefined || value === null;
        case "array":   return Array.isArray(value);
        case "integer": return typeof value === "number" && Math.ceil(value) === value;
        case "object":  return (keys && value && !hasKeys(value, keys)) ? false
                             : (value || 0).constructor === ({}).constructor;
        default:        return Object.prototype.toString.call(value) === "[object " + type + "]";
        }
    }
    function hasKeys(value, keys) {
        var ary = keys ? keys.split(",") : null;

        return Object.keys(value).every(function(key) {
            return ary.indexOf(key) >= 0;
        });
    }
}
function _if(value, msg) {
    if (value) {
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

})(this.self || global);

