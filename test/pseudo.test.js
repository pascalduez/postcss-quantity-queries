import fs from 'fs';
import path from 'path';
import test from 'ava';
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../';

const read = name =>
  fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');


test('pseudo::at-least', () => {
  const input = read('pseudo/at-least/input.css');
  const expected = read('pseudo/at-least/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('pseudo::at-most', () => {
  const input = read('pseudo/at-most/input.css');
  const expected = read('pseudo/at-most/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('pseudo::between', () => {
  const input = read('pseudo/between/input.css');
  const expected = read('pseudo/between/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});

test('pseudo::exactly', () => {
  const input = read('pseudo/exactly/input.css');
  const expected = read('pseudo/exactly/expected.css');

  return postcss()
    .use(plugin)
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    });
});
