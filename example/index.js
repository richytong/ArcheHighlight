const code = `
function f() {
  const x = 1
}

f()
`

const Root = ReactElement(() => {
  return [
    H1("ArcheHighlight Example"),
    P("The following code was highlighted with ArcheHighlight and CSS."),
    Div({ class: "code-viewer" }, [
      Code([Pre(ArcheHighlight.parseJavaScript(code))])
    ]),
  ]
})

ReactDOM.render(Root(), document.getElementById("react-root"))
