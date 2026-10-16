const code = `
function f() {
  const x = 1
}

f()
`

const Root = ReactElement(() => {
  return [
    H1("Welcome to Vanilla Microfrontends with React."),
    P("All of the content on this page was added with React."),
    Div({ class: "code-viewer" }, [
      Code([Pre(ArcheHighlight.parseJavaScript(code))])
    ]),
  ]
})

ReactDOM.render(Root(), document.getElementById("react-root"))
