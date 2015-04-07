'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var postcss = require('postcss');
var plugin = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('pseudo::at-least', function (assert) {
  assert.plan(1);

  var input = read('pseudo/at-least/input.css');
  var expected = read('pseudo/at-least/expected.css');
  var css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::at-most', function (assert) {
  assert.plan(1);

  var input = read('pseudo/at-most/input.css');
  var expected = read('pseudo/at-most/expected.css');
  var css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::between', function (assert) {
  assert.plan(1);

  var input = read('pseudo/between/input.css');
  var expected = read('pseudo/between/expected.css');
  var css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::exactly', function (assert) {
  assert.plan(1);

  var input = read('pseudo/exactly/input.css');
  var expected = read('pseudo/exactly/expected.css');
  var css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});
