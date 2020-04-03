/**

 → Program (enter)
   → CallExpression (enter)
     → NumberLiteral (enter)
     ← NumberLiteral (exit)
     → CallExpression (enter)
       → NumberLiteral (enter)
       ← NumberLiteral (exit)
       → NumberLiteral (enter)
       ← NumberLiteral (exit)
     ← CallExpression (exit)
   ← CallExpression (exit)
 ← Program (exit)

 */

/**
 * 遍历器，触发 visitor 上定义的钩子函数
 *
 * @param ast 抽象语法树
 * @param visitor {object} 访问者
 * var visitor = {
 *   NumberLiteral: {
 *     enter(node, parent) {},
 *     exit(node, parent) {},
 *   }
 * };
 */
function traverser(ast, visitor) {

  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    })
  }

  function traverseNode(node, parent) {
    let methods = visitor[node.type];

    // 钩子-进入节点
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;
      case 'CallExpression':
        traverseArray(node.params, node);
        break;
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      default:
        throw new TypeError(node.type);
    }

    // 钩子-退出节点
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // 发动
  traverseNode(ast, null);
}

module.exports = traverser;
