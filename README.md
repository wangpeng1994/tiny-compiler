# tiny-compiler

https://the-super-tiny-compiler.glitch.me/tokenizer

```
2 + (4 - 2)

// LISP-style
(add 2 (subtract 4 2))

// C-style
add(2, subtract(4, 2))
```

tokenizer
```js
[
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'add'      },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'subtract' },
  { type: 'number', value: '4'        },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: ')'        },
  { type: 'paren',  value: ')'        },
]
```

parser
```js
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type: 'NumberLiteral',
      value: '2',
    }, {
      type: 'CallExpression',
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4',
      }, {
        type: 'NumberLiteral',
        value: '2',
      }]
    }]
  }]
}
```

traverser

 - → Program (enter)
   - → CallExpression (enter)
     - → NumberLiteral (enter)
     - ← NumberLiteral (exit)
     - → CallExpression (enter)
       - → NumberLiteral (enter)
       - ← NumberLiteral (exit)
       - → NumberLiteral (enter)
       - ← NumberLiteral (exit)
     - ← CallExpression (exit)
   - ← CallExpression (exit)
 - ← Program (exit)