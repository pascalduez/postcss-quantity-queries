/* eslint-disable no-console */

import fs from 'fs';
import { join } from 'path';
import postcss from 'postcss';
import plugin from '../';

const read = name =>
  fs.readFileSync(join(__dirname, 'fixture', name), 'utf8');


['at-least', 'at-most', 'between', 'exactly'].forEach(test => {
  const input = read(join('atrule', test, 'input.css'));
  const css = postcss(plugin()).process(input).css;

  console.log(css);
});

['at-least', 'at-most', 'between', 'exactly'].forEach(test => {
  const input = read(join('pseudo', test, 'input.css'));
  const css = postcss(plugin()).process(input).css;

  console.log(css);
});
