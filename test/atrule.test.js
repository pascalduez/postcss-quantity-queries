import fs from 'fs';
import path from 'path';
import test from 'ava';
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../';

const read = name =>
  fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');


test('atrule::at-least', () => {
  const input = read('atrule/at-least/input.css');
  const expected = read('atrule/at-least/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('atrule::at-most', () => {
  const input = read('atrule/at-most/input.css');
  const expected = read('atrule/at-most/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('atrule::between', () => {
  const input = read('atrule/between/input.css');
  const expected = read('atrule/between/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('atrule::exactly', () => {
  const input = read('atrule/exactly/input.css');
  const expected = read('atrule/exactly/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});
