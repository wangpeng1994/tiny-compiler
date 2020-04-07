const tokenizer = require('./1-tokenizer');
const parser = require('./2-parser');
const traverser = require('./3-traverser');
const transformer = require('./4-transformer');
const codeGenerator = require('./5-code-generator');
const compiler = require('./6-compiler');

module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler
};
