# postcss-quantity-queries

> [PostCSS] plugin enabling quantity-queries.

This plugin is derived from the Sass [Quantity Queries mixins] by Daniel Guillan.  
For informations about quantity queries check this A List Apart [article] as well
as Daniel’s [demo] on CodePen.


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

input:

```css
ul > li {
  @at-least 4 { ... }
}

nav > div {
  @between 2 6 span { ... }
}
```

## API

### at-least()

Target the items inside elements that contain `count` items or more:
```css
@at-least(count [, selector]) { ... }
```

### at-most()

Target the items inside elements that contain `count` items or less:
```css
@at-most(count [, selector]) { ... }
```

### between()

Target the items inside elements that contain a range between `start` and `end` items:
```css
@between(start, end [, selector]) { ... }
```

### exactly()

Target the items inside elements that contain exactly `count` items:
```css
@exactly(count [, selector]) { ... }
```

## Credits

* [Pascal Duez](https://twitter.com/pascalduez)


## Licence

postcss-quantity-queries is [unlicensed](http://unlicense.org/).



[PostCSS]: https://github.com/postcss/postcss
[article]: http://alistapart.com/article/quantity-queries-for-css
[Quantity Queries mixins]: https://github.com/danielguillan/quantity-queries
[demo]: http://codepen.io/danielguillan/pen/GgBOxm
