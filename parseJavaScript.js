// pushWordTerm(parsedElements Array<object|string>, term string) -> ()
function pushWordTerm(parsedElements, term) {
  if (term == "process" || term == "require" || term == "console" || term == "window" || term == "global" || term == "globalThis") {
    parsedElements.push(Span({ class: "global-object" }, term))
  } else if (term == "true" || term == "false") {
    parsedElements.push(Span({ class: "boolean" }, term))
  } else {
    parsedElements.push(term)
  }
}

function parseJavaScript(text) {
  const parsedElements = []

  let index = 0
  let term = ""
  let isStringSingleQuote = false
  let isStringDoubleQuote = false
  let isNumber = false
  let isTemplateLiteral = false

  // TODO `` string template
  // TODO [] array
  // TODO for await, for, await, of

  /*
const DiskSortedHashTable = require('presidium-db/DiskSortedHashTable')

const sortedHt = new DiskSortedHashTable({
  storageFilepath: '/path/to/sortedHt-storage-file',
  headerFilepath: '/path/to/sortedHt-header-file',
  initialLength: 1024,
})
await sortedHt.init()

await sortedHt.set('first-key', 'first-value', 1)
await sortedHt.set('second-key', 'second-value', 2)
await sortedHt.set('third-key', 'third-value', 3)

for await (const value of sortedHt.forwardIterator()) {
  console.log(value) // first-value
                     // second-value
                     // third-value
}

for await (const value of sortedHt.reverseIterator()) {
  console.log(value) // third-value
                     // second-value
                     // first-value
}
  */

  while (index < text.length) {
    let c = text[index]

    /*
    if (parsedElements.length > 9) {
      console.log(parsedElements)
      console.log({ term, c })
      throw new Error("x")
    }
    */

    if (isNumber && !/\d/.test(c)) {
      isNumber = false
      parsedElements.push(Span({ class: "number" }, term))
      term = ""
    }

    if (term.length == 0 && /\d/.test(c)) {
      isNumber = true
      term += c
      index += 1
    } else if (isStringSingleQuote && c !== "'") {
      term += c
      index += 1
    } else if (c === "'") {
      if (isStringSingleQuote) {
        isStringSingleQuote = false
        term += c
        parsedElements.push(Span({ class: "string" }, term))
        term = ""
        index += 1
      } else {
        isStringSingleQuote = true
        if (term.length > 0) {
          throw new Error(term)
        }
        term += c
        index += 1
      }
    } else if (isStringDoubleQuote && c !== "\"") {
      term += c
      index += 1
    } else if (c === "\"") {
      if (isStringDoubleQuote) {
        isStringDoubleQuote = false
        term += c
        parsedElements.push(Span({ class: "string" }, term))
        term = ""
        index += 1
      } else {
        isStringDoubleQuote = true
        if (term.length > 0) {
          pushWordTerm(parsedElements, term)
          term = ""
        }
        term += c
        index += 1
      }
    }
    else if (isTemplateLiteral && c !== "`") {
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
    }
    else if (c === "`") {
      if (isTemplateLiteral) {
        isTemplateLiteral = false
        term += c
        parsedElements.push(Span({ class: "template-literal" }, term))
        term = ""
        index += 1
      } else {
        isTemplateLiteral = true
        if (term.length > 0) {
          pushWordTerm(parsedElements, term)
          term = ""
        }
        term += c
        index += 1
      }
    }
    else if (c === " " || c === "\n") {
      if (term.length == 0) {
        parsedElements.push(c)
        index += 1
      } else if (term == "//") {
        while (c !== "\n") {
          term += c
          index += 1
          c = text[index]
        }
        parsedElements.push(Span({ class: "comment" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (term == "/*") {
        let c0 = c
        term += c
        index += 1
        c = text[index]
        while (c0 !== "*" && c !== "/") {
          c0 = c
          term += c
          index += 1
          c = text[index]
        }
        term += c
        parsedElements.push(Span({ class: "comment" }, term))
        term = ""
        index += 1
      } else if (term == "const" || term == "let" || term == "var") {
        parsedElements.push(Span({ class: "variable-declaration-keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      }
      else if (term == "+" || term == "-" || term == "*" || term == "/" || term == "**" || term == "=" || term == "==" || term == "===" || term == "!=" || term == "!==" || term == ">" || term == ">=" || term == "<" || term == "<=" || term == "?" || term == ":" || term == "&&" || term == "||" || term == "??" || term == "&" || term == "|" || term == "^" || term == "~" || term == ">>" || term == "<<") {
        parsedElements.push(Span({ class: "operator" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      }
      else if (term == "import" || term == "new" || term == "async" || term == "await" || term == "for" || term == "while" || term == "of") {
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
    } else if (c === ":") {
      if (term.length > 0) {
        parsedElements.push(Span({ class: "object-key" }, term))
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "(") {
      if (term === "") {
        // skip
      } else if (term == "require") {
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
