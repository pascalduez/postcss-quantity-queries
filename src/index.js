/* eslint-disable no-param-reassign, no-use-before-define, consistent-return */

import postcss, { list } from 'postcss';
import balanced from 'balanced-match';

export default postcss.plugin('postcss-quantity-queries', () => css => {
  css.walk(node => {
    if (node.type === 'rule') {
      return processRule(node);
    }
    if (node.type === 'atrule') {
      return processAtRule(node);
    }
  });
});

const rePseudo = /(.*)(?::{1,2})(at-(?:least|most)|between|exactly)/;
const reAtRule = /(at-(?:least|most)|between|exactly)/;

function processRule(rule) {
  if (!rePseudo.test(rule.selector)) return;

  rule.selectors =
  rule.selectors.map(s => {
    const { pre, body } = balanced('(', ')', s);
    const args = list.comma(body);
    const [selector, quantifier] = pre.split(/:{1,2}/);

    return quantifiers[quantifier](...args)([selector]);
  });
}

function processAtRule(atRule) {
  if (!reAtRule.test(atRule.name)) return;

  const args = list.space(atRule.params);
  const parent = atRule.parent;
  const root = parent.root();
  const selectors = quantifiers[atRule.name](...args)(parent.selectors);

  const newRule = postcss.rule({
    selectors,
    nodes: atRule.nodes,
    source: atRule.source,
    raws: {
      semicolon: true,
    },
  });

  cleanIndent(newRule);

  root.insertAfter(parent, newRule);
  atRule.remove();

  if (!parent.nodes.length) parent.remove();
}

const cleanIndent = rule =>
  rule.walkDecls(decl => {
    decl.raws.before = decl.raws.before.replace(/[^\S\x0a\x0d]{2,}/, '  ');
  });

const quantitySelectors = (quantifier, last) => (selectors) =>
  selectors.map(s =>
    `${s}${quantifier}, ${s}${quantifier} ~ ${last || list.space(s).pop()}`);

const quantifiers = {

  'at-least': (count, last) =>
    quantitySelectors(`:nth-last-child(n+${count})`, last),

  'at-most': (count, last) =>
    quantitySelectors(`:nth-last-child(-n+${count}):first-child`, last),

  between: (start, end, last) =>
    quantitySelectors(`:nth-last-child(n+${start}):nth-last-child(-n+${end}):first-child`, last),

  exactly: (count, last) =>
    quantitySelectors(`:nth-last-child(${count}):first-child`, last),

};
