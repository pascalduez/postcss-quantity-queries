const fs = require('fs');
const path = require('path');
const test = require('tape');
const postcss = require('postcss');
const plugin = require('../');

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('pseudo::at-least', function (assert) {
  assert.plan(1);

  const input = read('pseudo/at-least/input.css');
  const expected = read('pseudo/at-least/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::at-most', function (assert) {
  assert.plan(1);

  const input = read('pseudo/at-most/input.css');
  const expected = read('pseudo/at-most/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::between', function (assert) {
  assert.plan(1);

  const input = read('pseudo/between/input.css');
  const expected = read('pseudo/between/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});

test('pseudo::exactly', function (assert) {
  assert.plan(1);

  const input = read('pseudo/exactly/input.css');
  const expected = read('pseudo/exactly/expected.css');
  const css = postcss([plugin()]).process(input).css;

  assert.equal(css, expected);
});
