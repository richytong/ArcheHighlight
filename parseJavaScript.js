function testOperatorSymbol(c) {
  return c === "+" || c === "-" || c === "*" || c === "/" || c === "=" || c === "&" || c === "|" || c === "<" || c === ">" || c === "~" || c === "^" || c === "!" || c === "?" || c === ":"
}

// testComment(term string) -> boolean
function testComment(term) {
  return (term[0] === "/" && term[1] === "/")
    || (term[0] === "/" && term[1] === "*")
}

// testOperator(term string) -> boolean
function testOperator(term) {
  return term == "+" || term == "-" || term == "*" || term == "/" || term == "**" || term == "=" || term == "+=" || term == "++" || term == "-=" || term == "*=" || term == "/=" || term == "**=" || term == "==" || term == "===" || term == "!=" || term == "!==" || term == ">" || term == ">=" || term == "<" || term == "<=" || term == "?" || term == ":" || term == "&&" || term == "||" || term == "??" || term == "&" || term == "|" || term == "^" || term == "~" || term == ">>" || term == "<<" || term == "&=" || term == "|=" || term == "^="
}

// pushWordTerm(parsedElements Array<object|string>, term string) -> ()
function pushWordTerm(parsedElements, term) {
  if (term == "process" || term == "require" || term == "console" || term == "window" || term == "global" || term == "globalThis" || term == "isNaN") {
    parsedElements.push(Span({ class: "global-object" }, term))
  } else if (term == "undefined") {
    parsedElements.push(Span({ class: "undefined" }, term))
  } else if (term == "null") {
    parsedElements.push(Span({ class: "null" }, term))
  } else if (term == "true" || term == "false") {
    parsedElements.push(Span({ class: "boolean" }, term))
  } else if (term == "NaN") {
    parsedElements.push(Span({ class: "not-a-number" }, term))
  } else {
    parsedElements.push(term)
  }
}

function parseJavaScript(text) {
  const parsedElements = []

  let index = 0
  let term = ""
  let isSingleLineComment = false
  let isMultiLineComment = false
  let isNumber = false
  let isOperator = false
  let isStringSingleQuote = false
  let isStringDoubleQuote = false
  let isTemplateLiteral = false
  let isTernaryOperator = false

  // TODO function call with space

  while (index < text.length) {
    let c = text[index]

    /*
    if (parsedElements.length > 5) {
      console.log(parsedElements)
      console.log({ term, c })
      throw new Error("x") }
    */

    if (isSingleLineComment && c === "\n") {
      isSingleLineComment = false
      parsedElements.push(Span({ class: "comment" }, term))
      term = ""
    } else if (isMultiLineComment && term[term.length - 1] === "*" && c === "/") {
      isMultiLineComment = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "comment" }, term))
      term = ""
    } else if (isNumber && !/[\dn]/.test(c)) {
      isNumber = false
      if (term[term.length - 1] === "n") {
        parsedElements.push(Span({ class: "bigint" }, term))
      } else if (term.includes("n")) {
        parsedElements.push(term)
      } else {
        parsedElements.push(Span({ class: "number" }, term))
      }
      term = ""
    } else if (isOperator && !testOperatorSymbol(c)) {
      isOperator = false
      if (term == "=>") {
        parsedElements.push(Span({ class: "arrow-function-operator" }, term))
      } else if (term == "?") {
        isTernaryOperator = true
        parsedElements.push(Span({ class: "operator" }, term))
      } else if (term == ":") {
        if (isTernaryOperator) {
          parsedElements.push(Span({ class: "operator" }, term))
          isTernaryOperator = false
        } else {
          parsedElements.push(Span({ class: "object-colon" }, term))
        }
      } else {
        parsedElements.push(Span({ class: "operator" }, term))
      }
      term = ""
    } else if (isStringSingleQuote && c === "'") {
      isStringSingleQuote = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "string" }, term))
      term = ""
    } else if (isStringDoubleQuote && c === "\"") {
      isStringDoubleQuote = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "string" }, term))
      term = ""
    } else if (isTemplateLiteral && c === "`") {
      isTemplateLiteral = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "template-literal" }, term))
      term = ""
    }

    if (isSingleLineComment) {
      term += c
      index += 1
    } else if (isMultiLineComment) {
      term += c
      index += 1
    } else if (isNumber) {
      term += c
      index += 1
    } else if (isOperator) {
      term += c
      index += 1
    } else if (isStringSingleQuote) {
      term += c
      index += 1
    } else if (isStringDoubleQuote) {
      term += c
      index += 1
    } else if (isTemplateLiteral) {
      if (c === "$") {
        let templateVariable = c
        index += 1
        c = text[index]
        if (c === "{") {
          parsedElements.push(Span({ class: "template-literal" }, term))
          while (c !== "}") {
            templateVariable += c
            index += 1
            c = text[index]
          }
          templateVariable += c
          parsedElements.push(Span({ class: "template-variable" }, templateVariable))
          term = ""
          index += 1
        } else {
          term += c
          index += 1
        }
      } else {
        term += c
        index += 1
      }
    } else if (c === "/" && text[index + 1] === "/") {
      isSingleLineComment = true
      term += c
      index += 1
    } else if (c === "/" && text[index + 1] === "*") {
      isMultiLineComment = true
      term += c
      index += 1
    } else if (term.length == 0 && /\d/.test(c)) {
      isNumber = true
      term += c
      index += 1
    } else if (term.length == 0 && testOperatorSymbol(c)) {
      isOperator = true
      term += c
      index += 1
    } else if (testOperatorSymbol(c)) {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      isOperator = true
      term = c
      index += 1
    } else if (c === ":") {
      parsedElements.push(term)
      if (isTernaryOperator) {
        parsedElements.push(Span({ class: "operator" }, term))
        isTernaryOperator = false
      } else {
        parsedElements.push(Span({ class: "object-colon" }, c))
      }
      term = ""
      index += 1
    } else if (term.length == 0 && c === "'") {
      isStringSingleQuote = true
      term += c
      index += 1
    } else if (term.length == 0 && c === "\"") {
      isStringDoubleQuote = true
      term += c
      index += 1
    } else if (term.length == 0 && c === "`") {
      isTemplateLiteral = true
      term += c
      index += 1
    } else if (c === " " || c === "\n") {
      if (term.length == 0) {
        parsedElements.push(c)
        index += 1
      } else if (term == "const" || term == "let" || term == "var") {
        parsedElements.push(Span({ class: "variable-declaration-keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (term == "import" || term == "new" || term == "async" || term == "await" || term == "for" || term == "while" || term == "of") {
        parsedElements.push(Span({ class: "keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (term == "function") {
        parsedElements.push(Span({ class: "function-keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (/^\d+$/.test(term)) {
        parsedElements.push(Span({ class: "number" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      }
      else {
        if (term.length > 0) {
          pushWordTerm(parsedElements, term)
        }
        parsedElements.push(c)
        term = ""
        index += 1
      }
    } else if (c === ".") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      term = c
      index += 1
      c = text[index]
      while (c === ".") {
        term += c
        index += 1
        c = text[index]
      }
      if (term.length === 1) {
        parsedElements.push(Span({ class: "property-accessor" }, term))
      } else {
        parsedElements.push(Span({ class: "spread-operator" }, term))
      }
      term = ""
    }
    else if (c === "(") {
      if (term === "") {
        // skip
      } else if (term == "require" || term == "isNaN") {
        parsedElements.push(Span({ class: "global-object" }, term))
      } else if (term == "while" || term == "for") {
        parsedElements.push(Span({ class: "keyword" }, term))
      } else {
        parsedElements.push(Span({ class: "function-name" }, term))
      }
      parsedElements.push(Span({ class: "opening-parentheses" }, c))
      term = ""
      index += 1
    } else if (c === ",") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === ")") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(Span({ class: "closing-parentheses" }, c))
      term = ""
      index += 1
    } else if (c === "{") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "}") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "[") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "]") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else {
      term += c
      index += 1
    }
  }

  if (term.length > 0) {
    pushWordTerm(parsedElements, term)
  }

  return parsedElements
}

module.exports = parseJavaScript
