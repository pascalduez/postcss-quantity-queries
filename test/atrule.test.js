'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var postcss = require('postcss');
var plugin = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('atrule::at-least', function (assert) {
  assert.plan(1);

  var input = read('atrule/at-least/input.css');
  var expected = read('atrule/at-least/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('atrule::at-most', function (assert) {
  assert.plan(1);

  var input = read('atrule/at-most/input.css');
  var expected = read('atrule/at-most/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('atrule::between', function (assert) {
  assert.plan(1);

  var input = read('atrule/between/input.css');
  var expected = read('atrule/between/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});

test('atrule::exactly', function (assert) {
  assert.plan(1);

  var input = read('atrule/exactly/input.css');
  var expected = read('atrule/exactly/expected.css');
  var css = postcss(plugin()).process(input).css;

  assert.equal(css, expected);
});
