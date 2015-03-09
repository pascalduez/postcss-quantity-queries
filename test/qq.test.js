'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var postcss = require('postcss');
var plugin = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('at-least', function (assert) {
  assert.plan(1);

  var input = read('at-least/input.css');
  var expected = read('at-least/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('at-most', function (assert) {
  assert.plan(1);

  var input = read('at-most/input.css');
  var expected = read('at-most/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('between', function (assert) {
  assert.plan(1);

  var input = read('between/input.css');
  var expected = read('between/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('exactly', function (assert) {
  assert.plan(1);

  var input = read('exactly/input.css');
  var expected = read('exactly/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});
