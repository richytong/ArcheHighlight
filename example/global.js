const ReactElement = Arche(React)
window.ReactElement = ReactElement

for (const elementName in ReactElement) {
  window[elementName] = ReactElement[elementName]
}
