# ArcheHighlight
Syntax highlighting for [vanilla microfrontends](https://arche.gallery/). Converts JavaScript code into a React Element or HTML.

```javascript
const ReactElement = Arche(React)
window.Span = ReactElement.Span

const code = `
function f() {
  const x = 1
}

f()
`

ArcheHighlight.parseJavaScript(code)
// '<span class="function-keyword">function</span>',
// ' ',
// '<span class="function-name">f</span>',
// ' ',
// '(',
// ')',
// ' ',
// '{',
// '\n',
// ' ',
// ' ',
// '<span class="variable-declaration-keyword">const</span>',
// ' ',
// 'x',
// ' ',
// '<span class="operator">=</span>',
// ' ',
// '<span class="number">1</span>',
// '\n',
// '}',
// '\n',
// '\n',
// '<span class="function-name">f</span>',
// '(',
// ')',
// '\n',
```

## React Element or HTML
ArcheHighlight requires a special `Span` function to exist globally on the server `globalThis` object or on the client `window` object. The global `Span` function can be from `ReactElement`, which is created from `Arche` and `React`.
```javascript
const ReactElement = Arche(React)
window.Span = ReactElement.Span
```

`React` can be the [React](https://react.dev/) library or a server-side polyfill of React. [ArcheHTML](https://github.com/richytong/ArcheHTML) comes installed with a `React` polyfill for server-side rendering.

## Docs
```coffeescript [specscript]
ArcheHighlight.parseJavaScript(code string) -> parsed string|object
```
ArcheHighlight JavaScript parser. Parses code into a React Element or HTML with JavaScript classes.

Arguments:
  * `code` - `string` - the JavaScript code to highlight.

Return:
  * `parsed` - `string|object` - a React Element or HTML with JavaScript classes.

### JavaScript Classes
The following JavaScript classes are added to the code as `span` elements of the parsed React Element or HTML:
  * `comment` - single line (`//`) or multi-line comments (`/* */`)
  * `number` - numbers, for example `1`, `0`, `2.5`, `-1`, `100`
  * `string` - strings, for example `"a"`, `'a'`, `"This is a string."`
  * `template-literal` - template literals, for example `` `This is a${x} ${y} literal` ``
  * `template-variable` - variables in template literals, for example the `${x}` and `${y}` in the template literal above.
  * `bigint` - JavaScript BigInts, for example `2n`
  * `variable-declaration-keyword` - `var`, `const`, `let`
  * `keyword` - `import`, `new`, `async`, `await`, `for`, `while`, `of`
  * `function-keyword` - the `function` keyword for function declarations, for example `function f() {}`
  * `arrow-function-operator` - the arrow function operator `=>` for arrow function declarations, for example `const fn = () => {}`
  * `function-name` - the name of a function, either in a function declaration or as the function of a function call, for example in `function f() {}`, `f` would have a `function-name` class, and in `add(1, 2)`, `add` would have a `function-name` class.
  * `operator` - the JavaScript operators `+`, `-`, `*`, `/`, `**`, `=`, `+=`, `++`, `-=`, `*=`, `/=`, `**=`, `==`, `===`, `!=`, `!==`, `>`, `>=`, `<`, `<=`, `?`, `:`, `&&`, `||`, `??`, `&`, `|`, `^`, `~`, `>>`, `<<`, `&=`, `|=`, and `^=`

  * `object-colon` - the colons (`:`) separating keys from values in JavaScript objects
  * `property-accessor` - the property access operator or dot operator (`.`), for example `Array.from`
  * `spread-operator` - the JavaScript spread operator (`...`)
  * `global-object` - global objects and functions: `process`, `require`, `console`, `window`, `global`, `globalThis`, `isNaN`
  * `undefined` - the `undefined` value
  * `null` - the `null` object
  * `boolean` - booleans `true` and `false`
  * `not-a-number` - the special numeric value `NaN` that represents an undefined or unrepresentable number, for example `0 / 0`
