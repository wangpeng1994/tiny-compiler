/**
 * 将源码字符串分割成 tokens
 * (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 *
 * @param input
 * @returns {[]}
 */
function tokenizer (input) {

  let current = 0;
  let tokens = [];

  while (current < input.length) {

    let char = input[current];

    // paren 圆括号
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current++;
      continue;
    }

    // 忽略跳过各种空白字符
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // number 数字
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    // string 字符串
    if (char === '"') {
      let value = '';
      char = input[++current]; // 从引号之后开始
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current]; // 跳过闭合引号
      tokens.push({ type: 'string', value });
      continue;
    }

    // name 函数名
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value});
      continue;
    }

    // 漏网之鱼
    throw new TypeError('非法字符: ' + char);
  }

  return tokens;
}

module.exports = tokenizer;
