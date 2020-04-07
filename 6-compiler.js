const tokenizer = require('./1-tokenizer');
const parser = require('./2-parser');
const transformer = require('./4-transformer');
const codeGenerator = require('./5-code-generator');

function compiler (input) {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  return output;
}

module.exports = compiler;
