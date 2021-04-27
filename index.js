/**
 * Copyright (c) 2021, Reece Stokes. (GPL-3.0 Licensed)
 * https://github.com/MrGriefs/calculate-string
 */

const reg = {
    bra: /\((.+)\)/
  , ind: /([\d.]+)\^([\d.]+)/
  , div: /([\d.]+)[/÷]([\d.]+)/
  , mul: /([\d.]+)[*x]([\d.]+)/i
  , add: /([\d.]+)\+([\d.]+)/
  , sub: /([\d.]+)-([\d.]+)/
}

const ops = {
    bra: (a, _, format) => parseString(a, format)
  , ind: (a, b) => Math.pow(Number(a), Number(b))
  , div: (a, b) => Number(a) / Number(b)
  , mul: (a, b) => Number(a) * Number(b)
  , add: (a, b) => Number(a) + Number(b)
  , sub: (a, b) => Number(a) - Number(b)
}

const orders = {
    BIDMAS: ["bra", "ind", "div", "mul", "add", "sub"]
  , PEMDAS: ["bra", "ind", "mul", "div", "add", "sub"]
}

function operate(type, a, b, format) {
    const op = ops[type];
    return op(a, b, format);
}

function parseString(string, format = orders.BIDMAS) {
    if (typeof string === "number") string = String(string);
    string = string.replace(/[ ,]+/g, "");
    for (const type of format) {
        const pattern = reg[type];
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
 * @returns {number}
 */
function calculateString (string, order = orders.BIDMAS) {
    if (typeof order === "string") order = orders[order.toUpperCase()];
    if (!Array.isArray(order)) throw new TypeError("Format must be \"BIDMAS\", \"PEMDAS\" or an Array, got \"" + typeof order + "\".");
    if (typeof string !== "string") throw new TypeError("`string` must be type of string, got \"" + typeof string + "\".")
    return Number(parseString(string, order));
}

if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = calculateString;
} else {
    ("undefined" != typeof globalThis ? globalThis : self).calculateString = calculateString
}