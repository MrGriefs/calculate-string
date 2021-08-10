<h2 align="center">Calculate String</h2>

<p align="center">
<a href="https://patreon.com/yeen"><img alt="Patreon" src="https://img.shields.io/badge/patreon-donate?color=F77F6F&labelColor=F96854&logo=patreon&logoColor=ffffff"></a>
<a href="https://discord.gg/eazpsZNrRk"><img alt="Discord" src="https://img.shields.io/discord/368557500884189186?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff"></a>
<img alt="David" src="https://img.shields.io/david/MrGriefs/calculate-string">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/MrGriefs/calculate-string">
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
BigInt(calculateString('2 ^ 64')) // BigInt: 18,446,744,073,709,551,616
Number.isNaN(calculateString("this won't get parsed")) // Boolean: true
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
