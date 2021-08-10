/**
 * Copyright (c) 2021, Reece Stokes. (MIT Licensed)
 * https://github.com/MrGriefs/calculate-string
 */

var jsbi = require('jsbi');

var big = jsbi.BigInt
  , exp = jsbi.exponentiate
  , div = jsbi.divide
  , mul = jsbi.multiply
  , add = jsbi.add
  , sub = jsbi.subtract

var reg = {
    bra: /\((.+)\)/
  , ind: /([\d.]+)\^([\d.]+)/
  , div: /([\d.]+)[/÷]([\d.]+)/
  , mul: /([\d.]+)[*x]([\d.]+)/i
  , add: /([\d.]+)\+([\d.]+)/
  , sub: /([\d.]+)-([\d.]+)/
}

var ops = {
    bra: (a, _, format) => parse(a, format)
  , ind: (a, b) => exp(big(a), big(b))
  , div: (a, b) => div(big(a), big(b))
  , mul: (a, b) => mul(big(a), big(b))
  , add: (a, b) => add(big(a), big(b))
  , sub: (a, b) => sub(big(a), big(b))
}

var orders = {
    BIDMAS: ["bra", "ind", "div", "mul", "add", "sub"]
  , PEMDAS: ["bra", "ind", "mul", "div", "add", "sub"]
}

function operate(type, a, b, format) {
    var op = ops[type];
    return op(a, b, format);
}

function parse(string, format) {
    if (typeof string === "number") string = String(string);
    string = string.replace(/[ ,]+/g, "");
    for (var type of format) {
        var pattern = reg[type];
        if (!pattern) continue;
        var match;
        while (match = string.match(pattern)) {
            string = string.slice(0, match.index) + operate(type, match[1], match[2], format) + string.slice(match.index + match[0].length);
        }
    }
    return string;
}

/**
 * Parses a string containing mathematical operators to a number.
 * @param {string} string - The string which contains mathematical operations.
 * @param {string|Array<string>=} [order=BIDMAS]
 * The order of operations to use. Defaults to BIDMAS.
 * 
 * Can be either "BIDMAS", "PEMDAS" or an array of the order of operations:
 *  - `bra`
 *  - `ind`
 *  - `div`
 *  - `mul`
 *  - `add`
 *  - `sub`
 * 
 * @returns {string}
 */
function calculate (string, order = orders.BIDMAS) {
    if (typeof order === "string") order = orders[order.toUpperCase()];
    if (!Array.isArray(order)) throw new TypeError("Format must be \"BIDMAS\", \"PEMDAS\" or an Array, got \"" + typeof order + "\".");
    if (typeof string !== "string") throw new TypeError("`string` must be type of string, got \"" + typeof string + "\".")
    return big(parse(string, order)).toString();
}

module.exports = calculate;