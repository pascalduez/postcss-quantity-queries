import postcss from 'postcss';
import list from 'postcss/lib/list';
import balanced from 'balanced-match';

export default postcss.plugin('postcss-quantity-queries', () => css => {
  css.eachRule(processRule);
  css.eachAtRule(processAtRule);
});

const rePseudo = /(.*)(?::{1,2})(at-(?:least|most)|between|exactly)/;
const reAtRule = /(at-(?:least|most)|between|exactly)/;

function processRule(rule) {
  if (!rePseudo.test(rule.selector)) return;

  rule.selectors =
  rule.selectors.map(s => {
    let { pre, body } = balanced('(', ')', s);
    let args = list.comma(body);
    let [ selector, quantifier ] = pre.split(/:{1,2}/);

    return quantifiers[quantifier](...args)([selector]);
  });
}

function processAtRule(atRule) {
  if (!reAtRule.test(atRule.name)) return;

  let args = list.space(atRule.params);
  let parent = atRule.parent;
  let root = parent.root();
  let selectors = quantifiers[atRule.name](...args)(parent.selectors);

  let newRule = postcss.rule({
    selectors,
    nodes: atRule.nodes,
    source: atRule.source,
    semicolon: true,
  });

  cleanIndent(newRule);

  root.insertAfter(parent, newRule);
  atRule.removeSelf();

  if (!parent.nodes.length) parent.removeSelf();
}

const cleanIndent = rule =>
  rule.eachDecl(decl => {
    decl.before = decl.before.replace(/[^\S\x0a\x0d]{2,}/, '  ');
  });

const quantitySelectors = (quantifier, last) => (selectors) =>
  selectors.map(s =>
    `${s}${quantifier}, ${s}${quantifier} ~ ${last || list.space(s).pop()}`);

const quantifiers = {

  'at-least': (count, last) =>
    quantitySelectors(`:nth-last-child(n+${count})`, last),

  'at-most': (count, last) =>
    quantitySelectors(`:nth-last-child(-n+${count}):first-child`, last),

  'between': (start, end, last) =>
    quantitySelectors(`:nth-last-child(n+${start}):nth-last-child(-n+${end}):first-child`, last),

  'exactly': (count, last) =>
    quantitySelectors(`:nth-last-child(${count}):first-child`, last),

};
