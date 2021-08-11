/**
 * Copyright (c) 2021, Reece Stokes. (MIT Licensed)
 * https://github.com/MrGriefs/calculate-string
 */

var bjs = require('big.js');

var pow = function (a, b) { if (b > 33219) return Infinity; if (b < -33219) return -Infinity; return a.lt(0) ? a.pow(b).times(-1) : a.pow(b) }
  , div = function (a, b) { return a.div(b) }
  , mul = function (a, b) { return a.times(b) }
  , add = function (a, b) { return a.plus(b) }
  , sub = function (a, b) { return a.minus(b) }

var reg = {
    bra: /\((.+)\)/
  , ind: /(\$?[\d.]+)(?:\^|\*{2})(\$?-?[\d.]+)/
  , div: /(\$?[\d.]+)[/÷](\$?-?[\d.]+)/
  , mul: /(\$?[\d.]+)[*x×](\$?-?[\d.]+)/i
  , add: /(\$?[\d.]+)(?!e)\+(\$?-?[\d.]+)/i
  , sub: /(\$?[\d.]+)-(\$?-?[\d.]+)/
}

var ops = {
    bra: (a, _, format) => a[0] === '-' ? parse(a.slice(1), format).times(-1) : parse(a, format)
  , ind: (a, b) => pow(big(a), Number(b))
  , div: (a, b) => div(big(a), big(b))
  , mul: (a, b) => mul(big(a), big(b))
  , add: (a, b) => add(big(a), big(b))
  , sub: (a, b) => sub(big(a), big(b))
}

var orders = {
    BIDMAS: ["bra", "ind", "div", "mul", "add", "sub"]
  , PEMDAS: ["bra", "ind", "mul", "div", "add", "sub"]
}

function big(n) {
    try { return new bjs(n) }
    catch(e) { return NaN }
}

function operate(type, a, b, format) {
    return ops[type](a, b, format);
}

function parse(string, format) {
    if (typeof string === "number") string = String(string);
    var isInfinite = false;
    string = string.replace(/[ ,$]+/g, "")
                   .replace(/\d\.?\d*e(\+?|-)\d+/gi, str => big(str).toString())
                   .replace(/Infinity/g, function () { isInfinite = true; return '1' });
    var methodResults = [];
    var methodNum = 0;
    for (var type of format) {
        var pattern = reg[type];
        if (!pattern) continue;
        var match;
        while (match = string.match(pattern)) {
            if (match[1][0] === '$') match[1] = methodResults[match[1].slice(1)];
            else if (match.input[0] === '-') match[1] = '-' + match[1];
            if (match[2] && match[2][0] === '$') match[2] = methodResults[match[2].slice(1)];
            methodResults[methodNum] = operate(type, match[1], match[2], format);
            string = string.slice(0, match.index) + '$' + methodNum + string.slice(match.index + match[0].length);
            methodNum++
        }
    }
    var result = methodResults[methodResults.length - 1] || big(string);
    if (isInfinite) return (result.lt(0) ? '-' : '') + 'Infinity';
    else return result;
}

/**
 * Parses a string containing mathematical operators to a number.
 * @param {string} string - The string which contains mathematical operations.
 * @param {(string|Array<string>)} [order=BIDMAS]
 * The order of operations to use. Defaults to BIDMAS.  
 * Can be either "BIDMAS", "PEMDAS" or an array of the order of operations:  
 * ```
 * ['bra', 'ind', 'div', 'mul', 'add', 'sub']
 * ```
 * @returns {string}
 */
function calculate (string, order = orders.BIDMAS) {
    if (typeof order === "string") order = orders[order.toUpperCase()];
    if (!Array.isArray(order)) throw new TypeError("Format must be \"BIDMAS\", \"PEMDAS\" or an Array, got \"" + typeof order + "\".");
    if (typeof string !== "string") throw new TypeError("`string` must be type of string, got \"" + typeof string + "\".")
    return parse(string, order).toString();
}

module.exports = calculate;