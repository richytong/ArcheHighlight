/**
 * ArcheHighlight may be freely distributed under the CFOSS license.
 */

(function (root, ArcheHighlight) {
  if (typeof module == 'object') (module.exports = ArcheHighlight) // CommonJS
  else if (typeof define == 'function') define(() => ArcheHighlight) // AMD
  else (root.ArcheHighlight = ArcheHighlight) // Browser
}(typeof globalThis == 'object' ? globalThis : this, (function () { 'use strict'

function testOperatorSymbol(c) {
  return c === "+" || c === "-" || c === "*" || c === "/" || c === "=" || c === "&" || c === "|" || c === "<" || c === ">" || c === "~" || c === "^" || c === "!" || c === "?" || c === ":"
}

// pushWordTerm(parsedElements Array<object|string>, term string, index number, text string) -> ()
function pushWordTerm(parsedElements, term, index, text) {
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
    const spaces = []
    let c = text[index]
    while (c === " " || c === "\n") {
      spaces.push(c)
      index += 1
      c = text[index]
    }
    if (c === "(") {
      parsedElements.push(Span({ class: "function-name" }, term))
    } else {
      parsedElements.push(term)
    }
    parsedElements.push(...spaces)
  }
  return index
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
  let isFunctionDeclaration = false

  while (index < text.length) {
    let c = text[index]

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
    } else if (isStringSingleQuote && c === "'" && term[term.length - 1] !== "\\") {
      isStringSingleQuote = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "string" }, term))
      term = ""
    } else if (isStringDoubleQuote && c === "\"" && term[term.length - 1] !== "\\") {
      isStringDoubleQuote = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "string" }, term))
      term = ""
    } else if (isTemplateLiteral && c === "`" && term[term.length - 1] !== "\\") {
      isTemplateLiteral = false
      term += c
      index += 1
      c = text[index]
      parsedElements.push(Span({ class: "template-literal" }, term))
      term = ""
    }

    if (index == text.length) {
      break
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
          term += templateVariable
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
        pushWordTerm(parsedElements, term, index, text)
      }
      isOperator = true
      term = c
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
      } else if (term == "import" || term == "new" || term == "async" || term == "await" || term == "for" || term == "while" || term == "of" || term == "from") {
        parsedElements.push(Span({ class: "keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (term == "function") {
        isFunctionDeclaration = true
        parsedElements.push(Span({ class: "function-keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (isFunctionDeclaration) {
        isFunctionDeclaration = false
        parsedElements.push(Span({ class: "function-name" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else {
        if (term.length > 0) {
          index = pushWordTerm(parsedElements, term, index, text)
          c = text[index]
          if (c !== " " && c !== "\n") {
            term = ""
            continue
          }
        }
        parsedElements.push(c)
        term = ""
        index += 1
      }
    } else if (c === ".") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
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
    } else if (c === "(") {
      if (term === "") {
        // skip
      } else if (term == "require" || term == "isNaN") {
        parsedElements.push(Span({ class: "global-object" }, term))
      } else if (term == "while" || term == "for") {
        parsedElements.push(Span({ class: "keyword" }, term))
      } else {
        parsedElements.push(Span({ class: "function-name" }, term))
        isFunctionDeclaration = false
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === ",") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === ")") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "{") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "}") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "[") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "]") {
      if (term.length > 0) {
        pushWordTerm(parsedElements, term, index, text)
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
    if (isSingleLineComment) {
      parsedElements.push(Span({ class: "comment" }, term))
    } else if (isNumber) {
      if (term[term.length - 1] === "n") {
        parsedElements.push(Span({ class: "bigint" }, term))
      } else if (term.includes("n")) {
        parsedElements.push(term)
      } else {
        parsedElements.push(Span({ class: "number" }, term))
      }
    } else {
      pushWordTerm(parsedElements, term, index, text)
    }
  }

  return parsedElements
}

const ArcheHighlight = {
  parseJavaScript,
}

return ArcheHighlight
}())))
