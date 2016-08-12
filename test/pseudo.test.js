import fs from 'fs';
import path from 'path';
import test from 'ava';
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../';

const read = name =>
  fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');


test('pseudo::at-least', async () => {
  const input = read('pseudo/at-least/input.css');
  const expected = read('pseudo/at-least/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('pseudo::at-most', async () => {
  const input = read('pseudo/at-most/input.css');
  const expected = read('pseudo/at-most/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('pseudo::between', async () => {
  const input = read('pseudo/between/input.css');
  const expected = read('pseudo/between/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('pseudo::exactly', async () => {
  const input = read('pseudo/exactly/input.css');
  const expected = read('pseudo/exactly/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});
