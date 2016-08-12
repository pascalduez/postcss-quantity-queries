/* eslint-disable no-param-reassign, no-use-before-define, consistent-return */

import parser from 'postcss-selector-parser';
import balanced from 'balanced-match';
import postcss from 'postcss';

const rePseudo = /(.*)(?::{1,2})(at-(?:least|most)|between|exactly)/;
const reAtRule = /(at-(?:least|most)|between|exactly)/;

export default postcss.plugin('postcss-quantity-queries', () => css => {
  css.walk(node => {
    if (node.type === 'rule' && rePseudo.test(node.selector)) {
      return processRule(node);
    }

    if (node.type === 'atrule' && reAtRule.test(node.name)) {
      return processAtRule(node);
    }
  });
});

function processRule(rule) {
  rule.selectors = rule.selectors.map(sel => {
    const { pre, body } = balanced('(', ')', sel);
    const args = postcss.list.comma(body);
    const [selector, quantifier] = pre.split(/:{1,2}/);

    return quantifiers[quantifier](...args)([selector]);
  });
}

function processAtRule(atRule) {
  const { parent, name } = atRule;
  const { body, post } = balanced('(', ')', atRule.params);
  const args = postcss.list.comma(body);

  const selector = quantitySelectors(name, ...args)(parent.selector, post);

  const newRule = postcss.rule({
    selector,
    nodes: atRule.nodes,
    source: atRule.source,
    raws: {
      semicolon: true,
    },
  });

  cleanIndent(newRule);

  parent.root().insertAfter(parent, newRule);
  atRule.remove();

  if (!parent.nodes.length) {
    parent.remove();
  }
}

const quantitySelectors = (quantifier, ...args) => (selector, post = '') => {
  // console.log(quantifier);
  // console.log(args);
  // console.log(selector);
  // console.log(post);
  const pseudoToken = parser.pseudo({
    value: quantifiers[quantifier](...args),
  });
  console.log(pseudoToken);
  // const postToken = parser.string({ value: post });
  // const siblingToken = parser.combinator({ value: '~' });
  // siblingToken.spaces = { before: ' ', after: ' ' };
  //
  const transform = selectors => {
    // let last;
    selectors.each(sel => {
      console.log(sel.last);
      // let fake = parser.className({ value: 'foobar__' + index });
      // console.log(fake);
      // console.log(sel.parent);
      // last = sel.last;
      // console.log(sel.last);
      // sel.parent.insertAfter(sel, fake);
    });
  };

  return parser(transform).processSync(selector).result;

  // return selectors.map(sel =>
  //   `${sel}${pseudo}${post}, ${sel}${pseudo} ~ ${last}${post}`);
  // return ['', ''];
};

const quantifiers = {
  'at-least': count => `:nth-last-child(n+${count})`,

  'at-most': count => `:nth-last-child(-n+${count}):first-child`,

  between: (start, end) =>
    `:nth-last-child(n+${start}):nth-last-child(-n+${end}):first-child`,

  exactly: count => `:nth-last-child(${count}):first-child`,
};

/**
 * Helper: remove excessive declarations indentation.
 */
function cleanIndent(rule) {
  rule.walkDecls(decl => {
    if (typeof decl.raws.before === 'string') {
      decl.raws.before = decl.raws.before.replace(/[^\S\n\r]{2,}/, '  ');
    }
  });
}
