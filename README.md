# postcss-quantity-queries

[![npm version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]


> [PostCSS] plugin enabling quantity-queries.

This plugin is derived from the Sass [Quantity Queries mixins] by Daniel Guillan.  
For informations about quantity queries check those resources:  
[Quantity Queries for CSS][]  
[Styling elements based on sibling count][]  
[Daniel’s demo on CodePen][]  



## Installation

```
npm install postcss-quantity-queries --save-dev
```



## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var quantityQueries = require('postcss-quantity-queries');

var css = fs.readFileSync('input.css', 'utf8');

var output = postcss()
  .use(quantityQueries())
  .process(css)
  .css;
```



## API

### at-least

Target `count` items or more:
```css
:at-least(count) { ... }
```
input:
```css
ul > li:at-least(4) {
  color: rebeccapurple;
}
```
output:
```css
ul > li:nth-last-child(n+4),
ul > li:nth-last-child(n+4) ~ li {
  color: rebeccapurple;
}
```



### at-most

Target `count` items or less:
```css
:at-most(count) { ... }
```
input:
```css
ul > li:at-most(4) {
  color: rebeccapurple;
}
```
output:
```css
ul > li:nth-last-child(-n+4):first-child,
ul > li:nth-last-child(-n+4):first-child ~ li {
  color: rebeccapurple;
}
```



### between

Target a range of items between `start` and `end`:
```css
:between(start, end) { ... }
```
input:
```css
ul > li:between(4, 6) {
  color: rebeccapurple;
}
```
output:
```css
ul > li:nth-last-child(n+4):nth-last-child(-n+6):first-child,
ul > li:nth-last-child(n+4):nth-last-child(-n+6):first-child ~ li {
  color: rebeccapurple;
}
```



### exactly

Target exactly `count` items:
```css
:exactly(count) { ... }
```
input:
```css
ul > li:exactly(4) {
  color: rebeccapurple;
}
```
output:
```css
ul > li:nth-last-child(4):first-child,
ul > li:nth-last-child(4):first-child ~ li {
  color: rebeccapurple;
}
```

### All pseudo-selector extensions

Selector | Description
---|---
[#](#at-least) `:at-least(count) { … }` | Target `count` items or more
[#](#at-most) `:at-most(count) { … }` | Target `count` items or less
[#](#between) `:between(start, end) { … }` | Target a range of items between `start` and `end`
[#](#exactly) `:exactly(count) { … }` | Target exactly `count` items

## At-rule API

There is also an at-rule API, similar to pre-processors.  
Although the recommended API is the pseudo-selectors one.

```css
@at-least count [, selector] { ... }
```
```css
@at-most count [, selector] { ... }
```
```css
@between start end [, selector] { ... }
```
```css
@exactly count [, selector] { ... }
```

```css
ul > li {
  @at-least 4 span {
    color: rebeccapurple;
  }
}

ul > li {
  @between 4 6 {
    color: rebeccapurple;
  }
}
```

Check out the [tests](test/fixtures) for more examples.



## Credits

* [Pascal Duez](https://twitter.com/pascalduez)


## Licence

postcss-quantity-queries is [unlicensed](http://unlicense.org/).



[PostCSS]: https://github.com/postcss/postcss
[Quantity Queries mixins]: https://github.com/danielguillan/quantity-queries
[Quantity Queries for CSS]: http://alistapart.com/article/quantity-queries-for-css
[Styling elements based on sibling count]: http://lea.verou.me/2011/01/styling-children-based-on-their-number-with-css3
[Daniel’s demo on CodePen]: http://codepen.io/danielguillan/pen/GgBOxm

[npm-url]: https://www.npmjs.org/package/postcss-quantity-queries
[npm-image]: http://img.shields.io/npm/v/postcss-quantity-queries.svg?style=flat-square
[travis-url]: https://travis-ci.org/pascalduez/postcss-quantity-queries?branch=master
[travis-image]: http://img.shields.io/travis/pascalduez/postcss-quantity-queries.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/pascalduez/postcss-quantity-queries
[coveralls-image]: https://img.shields.io/coveralls/pascalduez/postcss-quantity-queries.svg?style=flat-square
[depstat-url]: https://david-dm.org/pascalduez/postcss-quantity-queries
[depstat-image]: https://david-dm.org/pascalduez/postcss-quantity-queries.svg?style=flat-square
[license-image]: http://img.shields.io/npm/l/postcss-quantity-queries.svg?style=flat-square
[license-url]: UNLICENSE
