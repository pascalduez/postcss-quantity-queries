/* eslint-disable no-unused-expressions */

import fs from 'fs';
import path from 'path';
import test from 'ava';
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../';

const pluginName = require('../package.json').name;

const read = name =>
  fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');

const expected = read('control/expected.css');
const input = read('control/input.css');


test('control: no options', () =>
  postcss([plugin])
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    }));

test('control: with options', () =>
  postcss([plugin({})])
    .process(input)
    .then(result => {
      expect(result.css).to.equal(expected);
    }));

test('control: PostCSS legacy API', () => {
  const result = postcss([plugin.postcss]).process(input).css;
  expect(result).to.equal(expected);
});

test('control: PostCSS API', () => {
  const processor = postcss();
  processor.use(plugin);

  return processor.process(input).then(result => {
    expect(result.css).to.equal(expected);

    expect(processor.plugins[0].postcssPlugin).to.equal(pluginName);
    expect(processor.plugins[0].postcssVersion).to.be.ok;
  });
});
