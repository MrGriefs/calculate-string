<h2 align="center">Calculate String</h2>

<p align="center">
<a href="https://patreon.com/yeen"><img alt="Patreon" src="https://img.shields.io/badge/patreon-donate?color=F77F6F&labelColor=F96854&logo=patreon&logoColor=ffffff"></a>
<a href="https://github.com/MrGriefs/calculate-string"><img alt="David" src="https://img.shields.io/david/MrGriefs/calculate-string"></a>
<a href="https://travis-ci.com/github/MrGriefs/calculate-string"><img alt="Travis CI" src="https://api.travis-ci.com/MrGriefs/calculate-string.svg?branch=main"></a>
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/MrGriefs/calculate-string">
<a href="https://github.com/MrGriefs/calculate-string"><img alt="RunKit" src="https://img.shields.io/node/v/calculate-string"></a>
<a href="https://npm.runkit.com/calculate-string"><img alt="RunKit" src="https://img.shields.io/badge/Run-Kit-red"></a>
</p>
<p align="center">Parses strings containing mathematical operations.</p>

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

### Why?

So you can parse a string without using unsafe evals nor have to spend a detour creating a parser.

## Installation

With npm:  

```bash
$ npm install calculate-string
```

With yarn:  

```bash
$ yarn add calculate-string
```

## Usage

Try me on [RunKit](https://npm.runkit.com/calculate-string)

```javascript
const calculateString = require('calculate-string')

calculateString('1,000 + 1,000') // String: '2000'
calculateString('(100 + 10) / 10') // String: '11'
BigInt(calculateString('2 ** 64')) // BigInt: 18,446,744,073,709,551,616
BigInt(calculateString('NaN')) // SyntaxError: Cannot convert NaN to a BigInt
Number(calculateString('1e+6 ^ -1e+6')) // Number: -Infinity
calculateString("this won't get parsed")) == 'NaN' // Boolean: true
calculateString('1,000,000 ^ 10') // String: '1e+60'
Number(calculateString('1,000,000 ^ 10')) // Number: 1e+60
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/calculate-string/index.min.js"></script>
  </head>
  <body>
    <p id="result"></p>
    <script>
      document.getElementById("result").innerHTML = calculateString(
        "100 + 100"
      );
    </script>
  </body>
</html>

```
