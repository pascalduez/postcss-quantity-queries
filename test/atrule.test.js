const fs = require('fs');
const path = require('path');
const test = require('tape');
const postcss = require('postcss');
const plugin = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('atrule::at-least', function (assert) {
  assert.plan(1);

  const input = read('atrule/at-least/input.css');
  const expected = read('atrule/at-least/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('atrule::at-most', function (assert) {
  assert.plan(1);

  const input = read('atrule/at-most/input.css');
  const expected = read('atrule/at-most/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('atrule::between', function (assert) {
  assert.plan(1);

  const input = read('atrule/between/input.css');
  const expected = read('atrule/between/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('atrule::exactly', function (assert) {
  assert.plan(1);

  const input = read('atrule/exactly/input.css');
  const expected = read('atrule/exactly/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});
