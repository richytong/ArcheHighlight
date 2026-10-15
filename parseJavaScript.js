function parseJavaScript(text) {
  const parsedElements = []

  let index = 0
  let term = ""
  let isStringSingleQuote = false
  let isStringDoubleQuote = false
  let isNumber = false

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
          parsedElements.push(term)
          term = ""
        }
        term += c
        index += 1
      }
    } else if (c === " " || c === "\n") {
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
      } else if (term == "const" || term == "let" || term == "var" || term == "import" || term == "new") {
        parsedElements.push(Span({ class: "keyword" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      } else if (/^\d+$/.test(term)) {
        parsedElements.push(Span({ class: "number" }, term))
        parsedElements.push(c)
        term = ""
        index += 1
      }
      // TODO
      else {
        if (term.length > 0) {
          parsedElements.push(term)
        }
        parsedElements.push(c)
        term = ""
        index += 1
      }
    } else if (c === ".") {
      if (term.length > 0) {
        parsedElements.push(term)
      }
      parsedElements.push(Span({ class: "property-accessor" }, c))
      term = ""
      index += 1
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
        parsedElements.push(Span({ class: "require-keyword" }, term))
      } else {
        parsedElements.push(Span({ class: "function" }, term))
      }
      parsedElements.push(Span({ class: "opening-parentheses" }, c))
      term = ""
      index += 1
    } else if (c === ",") {
      if (term.length > 0) {
        parsedElements.push(term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === ")") {
      if (term.length > 0) {
        parsedElements.push(term)
      }
      parsedElements.push(Span({ class: "closing-parentheses" }, c))
      term = ""
      index += 1
    } else if (c === "{") {
      if (term.length > 0) {
        parsedElements.push(term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    } else if (c === "}") {
      if (term.length > 0) {
        parsedElements.push(term)
      }
      parsedElements.push(c)
      term = ""
      index += 1
    }
    else {
      term += c
      index += 1
    }
  }

  if (term.length > 0) {
    parsedElements.push(term)
  }

  return parsedElements
}

module.exports = parseJavaScript
