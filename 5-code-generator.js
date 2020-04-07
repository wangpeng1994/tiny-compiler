/**
 * 代码生成器：传入 AST，之后递归打印每种节点，将树拼为一个字符串，完成编译器代码转换。
 *
 * @param {object} node AST
 * @returns {string} 代码字符串 "add(2, subtract(4, 2));"
 */
function codeGenerator (node) {

  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n');

    case 'ExpressionStatement':
      return codeGenerator(node.expression) + ';';

    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      );
    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }

}

module.exports = codeGenerator;
