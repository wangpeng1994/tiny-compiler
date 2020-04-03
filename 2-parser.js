/**
 * 将 tokens 解析为 AST
 * [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 *
 * @param (Array) tokens
 * @returns {{}}
 */
function parser (tokens) {

  let current = 0;

  function walk () {
    let token = tokens[current];

    // 遇到 number 或者 string 参数就返回节点
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value
      };
    }
    if (token.type === 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value
      };
    }

    // 遇到左括号就构造 CallExpression 节点
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current]; // 跳过左括号，拿到 name 函数名
      // TODO 如果紧接着不是函数名呢？是否能编译报错
      // if (token.type !== 'name') {
      //   throw new TpeError('( 后面不是 name！');
      // }
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      };
      token = tokens[++current]; // 跳过 name token

      // 非右括号，可能直接就是 number 或 string 作为函数的参数
      // 也可能又遇到了左括号
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
        ) {
        node.params.push(walk()); // 推入参数
        token = tokens[current]; // walk() 时 current 已经自增，所以要更新 token 指向
      }

      current++; // 跳过右括号
      return node;
    }

    throw new TypeError(token.type);
  }

  // 创建 AST 根节点
  let ast = {
    type: 'Program',
    body: [] // 使用数组是因为 (add 2 2) 之后还可以继续是 (subtract 4 2)
  };
  while (current < tokens.length) {
    ast.body.push(walk()); // 发动
  }

  return ast;
}

module.exports = parser;
