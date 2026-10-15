const assert = require("assert")
const Arche = require("arche")
const React = require("./test/React")

globalThis.window = globalThis

const ReactElement = Arche(React)
window.ReactElement = ReactElement

for (const elementName in ReactElement) {
  window[elementName] = ReactElement[elementName]
}

const parseJavaScript = require("./parseJavaScript")

async function test1() {
  const code = `
/* test */
// import Presidium globally
require('presidium/global')

// import Presidium
const presidium = require('presidium')

// import Presidium clients
const DynamoDBTable = require('presidium/DynamoDBTable')
const S3Bucket = require('presidium/S3Bucket')
const WebSocket = require('presidium/WebSocket')
const Readable = require('presidium/Readable')
  `

  const parsedElements = parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="comment">/* test */</span>',
    '\n',
    '<span class="comment">// import Presidium globally</span>',
    '\n',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/global'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    '<span class="comment">// import Presidium</span>',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'presidium',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    '<span class="comment">// import Presidium clients</span>',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'DynamoDBTable',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/DynamoDBTable'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'S3Bucket',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/S3Bucket'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'WebSocket',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/WebSocket'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'Readable',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/Readable'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    ' ',
    ' '
  ])

}

async function test2() {
  const code = `
const HTTP = require('presidium/HTTP')

const server = HTTP.Server((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.write(JSON.stringify({ greeting: 'Hello World' }))
  response.end()
})

server.listen(3000)

const http = new HTTP('http://localhost:3000/')

http.get('/')
  .then(response => response.json())
  .then(console.log) // { greeting: 'Hello World' }
  `

  const parsedElements = parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'HTTP',
    ' ',
    '=',
    ' ',
    '<span class="require-keyword">require</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'presidium/HTTP'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'server',
    ' ',
    '=',
    ' ',
    'HTTP',
    '<span class="property-accessor">.</span>',
    '<span class="function">Server</span>',
    '<span class="opening-parentheses">(</span>',
    '<span class="opening-parentheses">(</span>',
    'request',
    ',',
    ' ',
    'response',
    '<span class="closing-parentheses">)</span>',
    ' ',
    '=>',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function">writeHead</span>',
    '<span class="opening-parentheses">(</span>',
    '<span class="number">200</span>',
    ',',
    ' ',
    '{',
    ' ',
    `<span class="string">'Content-Type'</span>`,
    ':',
    ' ',
    `<span class="string">'application/json'</span>`,
    ' ',
    '}',
    '<span class="closing-parentheses">)</span>',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function">write</span>',
    '<span class="opening-parentheses">(</span>',
    'JSON',
    '<span class="property-accessor">.</span>',
    '<span class="function">stringify</span>',
    '<span class="opening-parentheses">(</span>',
    '{',
    ' ',
    '<span class="object-key">greeting</span>',
    ':',
    ' ',
    `<span class="string">'Hello World'</span>`,
    ' ',
    '}',
    '<span class="closing-parentheses">)</span>',
    '<span class="closing-parentheses">)</span>',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function">end</span>',
    '<span class="opening-parentheses">(</span>',
    '<span class="closing-parentheses">)</span>',
    '\n',
    '}',
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    'server',
    '<span class="property-accessor">.</span>',
    '<span class="function">listen</span>',
    '<span class="opening-parentheses">(</span>',
    '<span class="number">3000</span>',
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    '<span class="keyword">const</span>',
    ' ',
    'http',
    ' ',
    '=',
    ' ',
    '<span class="keyword">new</span>',
    ' ',
    '<span class="function">HTTP</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'http://localhost:3000/'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    '\n',
    'http',
    '<span class="property-accessor">.</span>',
    '<span class="function">get</span>',
    '<span class="opening-parentheses">(</span>',
    `<span class="string">'/'</span>`,
    '<span class="closing-parentheses">)</span>',
    '\n',
    ' ',
    ' ',
    '<span class="property-accessor">.</span>',
    '<span class="function">then</span>',
    '<span class="opening-parentheses">(</span>',
    'response',
    ' ',
    '=>',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function">json</span>',
    '<span class="opening-parentheses">(</span>',
    '<span class="closing-parentheses">)</span>',
    '<span class="closing-parentheses">)</span>',
    '\n',
    ' ',
    ' ',
    '<span class="property-accessor">.</span>',
    '<span class="function">then</span>',
    '<span class="opening-parentheses">(</span>',
    'console',
    '<span class="property-accessor">.</span>',
    'log',
    '<span class="closing-parentheses">)</span>',
    ' ',
    `<span class="comment">// { greeting: 'Hello World' }</span>`,
    '\n',
    ' ',
    ' '
  ])

}

setImmediate(async () => {
  await test1()
  await test2()
  console.log("success")
})
