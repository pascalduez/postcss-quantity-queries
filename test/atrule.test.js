import fs from 'fs';
import path from 'path';
import test from 'ava';
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../';

const read = name =>
  fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');


test('atrule::at-least', async () => {
  const input = read('atrule/at-least/input.css');
  const expected = read('atrule/at-least/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('atrule::at-most', async () => {
  const input = read('atrule/at-most/input.css');
  const expected = read('atrule/at-most/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('atrule::between', async () => {
  const input = read('atrule/between/input.css');
  const expected = read('atrule/between/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});

test('atrule::exactly', async () => {
  const input = read('atrule/exactly/input.css');
  const expected = read('atrule/exactly/expected.css');

  const result = await postcss()
    .use(plugin)
    .process(input);

  expect(result.css).to.equal(expected);
});
