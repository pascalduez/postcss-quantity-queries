const fs = require('fs');
const path = require('path');
const test = require('tape');
const postcss = require('postcss');
const plugin = require('../');
const pluginName = require('../package.json').name;

function read(name) {
  return fs.readFileSync(path.join(__dirname, 'fixture', name), 'utf8');
}

test('control', function (assert) {
  assert.plan(5);

  const input = read('control/input.css');
  const expected = read('control/expected.css');
  let css;

  // No opts passed, no maps.
  css = postcss([plugin]).process(input).css;
  assert.equal(css, expected);

  // PostCSS legacy API.
  css = postcss([plugin.postcss]).process(input).css;
  assert.equal(css, expected);

  // PostCSS API.
  const processor = postcss();
  processor.use(plugin);
  css = processor.process(input).toString();
  assert.equal(css, expected);

  assert.equal(processor.plugins[0].postcssPlugin, pluginName);
  assert.ok(processor.plugins[0].postcssVersion);
});
