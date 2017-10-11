exports.jsonToPath = function(json) {
    return getPath(json);
}

exports.extend = extend;

function extend() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !this.isFunction(target) ) {
        target = {};
    }

    if ( length === i ) {
        target = this;
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && this.isArray(src) ? src : [];

                    } else {
                        clone = src && this.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = extend( deep, clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

function getPath(json, root) {
    var pathArr = [];
    root = root || "";
    for (var key in json) {
        var tmp = json[key];
        if (typeof tmp === "object") {
            var paths = getPath(tmp, key);
            for (var p in paths) {
                pathArr.push(paths[p]);
            }
        } else {
            var urlObj = this.getParams(tmp);
            pathArr.push({key: root + "/" + key, value: urlObj.url, param: urlObj.param, filter: urlObj.filter});
        }
    }
    return pathArr;
}

exports.parsePathParam = function(data) {
    var param = "?";
    for (var key in data) {
        if (data[key] instanceof Object) {
            data[key] = JSON.stringify(data[key]);
        }
        param += key +"="+ encodeURIComponent(data[key]) + "&";
    }
    return param;
}

exports.getParams = getParams = function(paramUrl) {
    var url = paramUrl || location.href;
    if (url.indexOf("?") <= 0) {
        return {};
    }
    var hostUrl = url.substring(0, url.indexOf("?"));
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; i <=paraString.length; i++) {
        var j = paraString[i] || 'wanglltest=';
        paraObj[j.substring(0, j.indexOf("="))] = decodeURIComponent(j.substring(j.indexOf("=") + 1, j.length));
    }
    if (paraObj instanceof String) {
        paraObj = eval("("+paraObj+")");
    }
    return {url: hostUrl, x: paraObj};
}

exports.isFunction= function( obj ) {
    return this.type(obj) === "function";
}

exports.isArray = Array.isArray || function( obj ) {
    return this.type(obj) === "array";
}

exports.isNumeric =function( obj ) {
    return !isNaN( parseFloat(obj) ) && isFinite( obj );
}
var class2type = {};
for (var name in "Boolean Number String Function Array Date RegExp Object Error".split(" ")) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
}
var core_toString = class2type.toString;
var core_hasOwn = class2type.hasOwnProperty;

exports.type = function( obj ) {
    if ( obj == null ) {
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object" :
        typeof obj;
}

exports.isPlainObject= function( obj ) {
    var key;

    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || this.type(obj) !== "object" || obj.nodeType ) {
        return false;
    }

    try {
        // Not own constructor property must be Object
        if ( obj.constructor &&
            !core_hasOwn.call(obj, "constructor") &&
            !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
            return false;
        }
    } catch ( e ) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    for ( key in obj ) {}

    return key === undefined || core_hasOwn.call( obj, key );
}

exports.isEmptyObject= function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}

