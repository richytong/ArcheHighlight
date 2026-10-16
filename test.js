const assert = require("assert")
const Arche = require("arche")
const React = require("./test/React")

globalThis.window = globalThis

const ReactElement = Arche(React)
window.ReactElement = ReactElement

for (const elementName in ReactElement) {
  window[elementName] = ReactElement[elementName]
}

const ArcheHighlight = require("./ArcheHighlight")

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

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="comment">/* test */</span>',
    '\n',
    '<span class="comment">// import Presidium globally</span>',
    '\n',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/global'</span>`,
    ')',
    '\n',
    '\n',
    '<span class="comment">// import Presidium</span>',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'presidium',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium'</span>`,
    ')',
    '\n',
    '\n',
    '<span class="comment">// import Presidium clients</span>',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'DynamoDBTable',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/DynamoDBTable'</span>`,
    ')',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'S3Bucket',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/S3Bucket'</span>`,
    ')',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'WebSocket',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/WebSocket'</span>`,
    ')',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'Readable',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/Readable'</span>`,
    ')',
    '\n',
    ' ',
    ' ',
  ])

}

async function test2() {
  const code = `
const HTTP = require('presidium/HTTP')

const server = HTTP.Server((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.write(JSON.stringify({ greeting:'Hello World', greeting2 : "Hello World 2" }))
  response.end()
})

server.listen(3000)

const http = new HTTP('http://localhost:3000/')

http.get('/')
  .then(response => response.json())
  .then(console.log) // { greeting: 'Hello World' }
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'HTTP',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/HTTP'</span>`,
    ')',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'server',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    'HTTP',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">Server</span>',
    '(',
    '(',
    'request',
    ',',
    ' ',
    'response',
    ')',
    ' ',
    '<span class="arrow-function-operator">=></span>',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">writeHead</span>',
    '(',
    '<span class="number">200</span>',
    ',',
    ' ',
    '{',
    ' ',
    `<span class="string">'Content-Type'</span>`,
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'application/json'</span>`,
    ' ',
    '}',
    ')',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">write</span>',
    '(',
    'JSON',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">stringify</span>',
    '(',
    '{',
    ' ',
    'greeting',
    '<span class="object-colon">:</span>',
    `<span class="string">'Hello World'</span>`,
    ',',
    ' ',
    'greeting2',
    ' ',
    '<span class="object-colon">:</span>',
    ' ',
    '<span class="string">"Hello World 2"</span>',
    ' ',
    '}',
    ')',
    ')',
    '\n',
    ' ',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">end</span>',
    '(',
    ')',
    '\n',
    '}',
    ')',
    '\n',
    '\n',
    'server',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">listen</span>',
    '(',
    '<span class="number">3000</span>',
    ')',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'http',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">new</span>',
    ' ',
    '<span class="function-name">HTTP</span>',
    '(',
    `<span class="string">'http://localhost:3000/'</span>`,
    ')',
    '\n',
    '\n',
    'http',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">get</span>',
    '(',
    `<span class="string">'/'</span>`,
    ')',
    '\n',
    ' ',
    ' ',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">then</span>',
    '(',
    'response',
    ' ',
    '<span class="arrow-function-operator">=></span>',
    ' ',
    'response',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">json</span>',
    '(',
    ')',
    ')',
    '\n',
    ' ',
    ' ',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">then</span>',
    '(',
    '<span class="global-object">console</span>',
    '<span class="property-accessor">.</span>',
    'log',
    ')',
    ' ',
    `<span class="comment">// { greeting: 'Hello World' }</span>`,
    '\n',
    ' ',
    ' ',
  ])

}

async function test3() {
  const code = `
const S3Bucket = require("presidium/S3Bucket")
const AwsCredentials = require('presidium/AwsCredentials')

async function fn() {
}
async () => {}
const awsCreds = await AwsCredentials('default')
awsCreds.region = 'us-east-1'

const myBucket = new S3Bucket({
  name: 'my-bucket',
  ...awsCreds,
})
await myBucket.ready

await myBucket.putObject('some-key', '{"hello":"world"}', {
  ContentType: 'application/json',
})
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'S3Bucket',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    '<span class="string">"presidium/S3Bucket"</span>',
    ')',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'AwsCredentials',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/AwsCredentials'</span>`,
    ')',
    '\n',
    '\n',
    '<span class="keyword">async</span>',
    ' ',
    '<span class="function-keyword">function</span>',
    ' ',
    '<span class="function-name">fn</span>',
    '(',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">async</span>',
    ' ',
    '(',
    ')',
    ' ',
    '<span class="arrow-function-operator">=></span>',
    ' ',
    '{',
    '}',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'awsCreds',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">await</span>',
    ' ',
    '<span class="function-name">AwsCredentials</span>',
    '(',
    `<span class="string">'default'</span>`,
    ')',
    '\n',
    'awsCreds',
    '<span class="property-accessor">.</span>',
    'region',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    `<span class="string">'us-east-1'</span>`,
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'myBucket',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">new</span>',
    ' ',
    '<span class="function-name">S3Bucket</span>',
    '(',
    '{',
    '\n',
    ' ',
    ' ',
    'name',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'my-bucket'</span>`,
    ',',
    '\n',
    ' ',
    ' ',
    '<span class="spread-operator">...</span>',
    'awsCreds',
    ',',
    '\n',
    '}',
    ')',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'myBucket',
    '<span class="property-accessor">.</span>',
    'ready',
    '\n',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'myBucket',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">putObject</span>',
    '(',
    `<span class="string">'some-key'</span>`,
    ',',
    ' ',
    `<span class="string">'{"hello":"world"}'</span>`,
    ',',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    'ContentType',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'application/json'</span>`,
    ',',
    '\n',
    '}',
    ')',
    '\n',
    ' ',
    ' ',
  ])

}

async function test4() {
  const code = `
const Docker = require('presidium/Docker')

const docker = new Docker()

const runStream = await docker.runContainer({
  image: 'node:15-alpine',
  env: { FOO: 'Example' },
  cmd: ['node', '-e', 'console.log(process.env.FOO)'],
  rm: true,
})

runStream.pipe(process.stdout) // Example

const s = "test"

const ts = \`123 \${s} 456\`
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'Docker',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    `<span class="string">'presidium/Docker'</span>`,
    ')',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'docker',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">new</span>',
    ' ',
    '<span class="function-name">Docker</span>',
    '(',
    ')',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'runStream',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">await</span>',
    ' ',
    'docker',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">runContainer</span>',
    '(',
    '{',
    '\n',
    ' ',
    ' ',
    'image',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'node:15-alpine'</span>`,
    ',',
    '\n',
    ' ',
    ' ',
    'env',
    '<span class="object-colon">:</span>',
    ' ',
    '{',
    ' ',
    'FOO',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'Example'</span>`,
    ' ',
    '}',
    ',',
    '\n',
    ' ',
    ' ',
    'cmd',
    '<span class="object-colon">:</span>',
    ' ',
    '[',
    `<span class="string">'node'</span>`,
    ',',
    ' ',
    `<span class="string">'-e'</span>`,
    ',',
    ' ',
    `<span class="string">'console.log(process.env.FOO)'</span>`,
    ']',
    ',',
    '\n',
    ' ',
    ' ',
    'rm',
    '<span class="object-colon">:</span>',
    ' ',
    '<span class="boolean">true</span>',
    ',',
    '\n',
    '}',
    ')',
    '\n',
    '\n',
    'runStream',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">pipe</span>',
    '(',
    '<span class="global-object">process</span>',
    '<span class="property-accessor">.</span>',
    'stdout',
    ')',
    ' ',
    '<span class="comment">// Example</span>',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    's',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="string">"test"</span>',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'ts',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="template-literal">`123 </span>',
    '<span class="template-variable">${s}</span>',
    '<span class="template-literal"> 456`</span>',
    '\n',
    ' ',
    ' ',
  ])

}

async function test5() {
  const code = `
const DiskSortedHashTable = require("presidium-db/DiskSortedHashTable")

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
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'DiskSortedHashTable',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="global-object">require</span>',
    '(',
    '<span class="string">"presidium-db/DiskSortedHashTable"</span>',
    ')',
    '\n',
    '\n',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'sortedHt',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="keyword">new</span>',
    ' ',
    '<span class="function-name">DiskSortedHashTable</span>',
    '(',
    '{',
    '\n',
    ' ',
    ' ',
    'storageFilepath',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'/path/to/sortedHt-storage-file'</span>`,
    ',',
    '\n',
    ' ',
    ' ',
    'headerFilepath',
    '<span class="object-colon">:</span>',
    ' ',
    `<span class="string">'/path/to/sortedHt-header-file'</span>`,
    ',',
    '\n',
    ' ',
    ' ',
    'initialLength',
    '<span class="object-colon">:</span>',
    ' ',
    '<span class="number">1024</span>',
    ',',
    '\n',
    '}',
    ')',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">init</span>',
    '(',
    ')',
    '\n',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">set</span>',
    '(',
    `<span class="string">'first-key'</span>`,
    ',',
    ' ',
    `<span class="string">'first-value'</span>`,
    ',',
    ' ',
    '<span class="number">1</span>',
    ')',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">set</span>',
    '(',
    `<span class="string">'second-key'</span>`,
    ',',
    ' ',
    `<span class="string">'second-value'</span>`,
    ',',
    ' ',
    '<span class="number">2</span>',
    ')',
    '\n',
    '<span class="keyword">await</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">set</span>',
    '(',
    `<span class="string">'third-key'</span>`,
    ',',
    ' ',
    `<span class="string">'third-value'</span>`,
    ',',
    ' ',
    '<span class="number">3</span>',
    ')',
    '\n',
    '\n',
    '<span class="keyword">for</span>',
    ' ',
    '<span class="keyword">await</span>',
    ' ',
    '(',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'value',
    ' ',
    '<span class="keyword">of</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">forwardIterator</span>',
    '(',
    ')',
    ')',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    '<span class="global-object">console</span>',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">log</span>',
    '(',
    'value',
    ')',
    ' ',
    '<span class="comment">// first-value</span>',
    '\n',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    '<span class="comment">// second-value</span>',
    '\n',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    '<span class="comment">// third-value</span>',
    '\n',
    '}',
    '\n',
    '\n',
    '<span class="keyword">for</span>',
    ' ',
    '<span class="keyword">await</span>',
    ' ',
    '(',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'value',
    ' ',
    '<span class="keyword">of</span>',
    ' ',
    'sortedHt',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">reverseIterator</span>',
    '(',
    ')',
    ')',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    '<span class="global-object">console</span>',
    '<span class="property-accessor">.</span>',
    '<span class="function-name">log</span>',
    '(',
    'value',
    ')',
    ' ',
    '<span class="comment">// third-value</span>',
    '\n',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    '<span class="comment">// second-value</span>',
    '\n',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    '<span class="comment">// first-value</span>',
    '\n',
    '}',
    '\n',
    ' ',
    ' ',
  ])

}

async function test6() {
  const code = `
true
[true, false, true, process, require]
let i = 0
while ( false ) {
}
while(false){
}
while ( true ) {
}
while(true){
}
for ( let j = 0; j < 5; j++ ) {
}
for(let j = 0; j < 5; j++){
}
var obj = {}
for ( const key in obj ) {
}
for(const key in obj){
}
let arr = []
for ( const key of arr ) {
}
for(const key of arr){
}
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="boolean">true</span>',
    '\n',
    '[',
    '<span class="boolean">true</span>',
    ',',
    ' ',
    '<span class="boolean">false</span>',
    ',',
    ' ',
    '<span class="boolean">true</span>',
    ',',
    ' ',
    '<span class="global-object">process</span>',
    ',',
    ' ',
    '<span class="global-object">require</span>',
    ']',
    '\n',
    '<span class="variable-declaration-keyword">let</span>',
    ' ',
    'i',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="keyword">while</span>',
    ' ',
    '(',
    ' ',
    '<span class="boolean">false</span>',
    ' ',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">while</span>',
    '(',
    '<span class="boolean">false</span>',
    ')',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">while</span>',
    ' ',
    '(',
    ' ',
    '<span class="boolean">true</span>',
    ' ',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">while</span>',
    '(',
    '<span class="boolean">true</span>',
    ')',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">for</span>',
    ' ',
    '(',
    ' ',
    '<span class="variable-declaration-keyword">let</span>',
    ' ',
    'j',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="number">0</span>',
    ';',
    ' ',
    'j',
    ' ',
    '<span class="operator"><</span>',
    ' ',
    '<span class="number">5</span>',
    ';',
    ' ',
    'j',
    '<span class="operator">++</span>',
    ' ',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">for</span>',
    '(',
    '<span class="variable-declaration-keyword">let</span>',
    ' ',
    'j',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="number">0</span>',
    ';',
    ' ',
    'j',
    ' ',
    '<span class="operator"><</span>',
    ' ',
    '<span class="number">5</span>',
    ';',
    ' ',
    'j',
    '<span class="operator">++</span>',
    ')',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="variable-declaration-keyword">var</span>',
    ' ',
    'obj',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '{',
    '}',
    '\n',
    '<span class="keyword">for</span>',
    ' ',
    '(',
    ' ',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'key',
    ' ',
    'in',
    ' ',
    'obj',
    ' ',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">for</span>',
    '(',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'key',
    ' ',
    'in',
    ' ',
    'obj',
    ')',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="variable-declaration-keyword">let</span>',
    ' ',
    'arr',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '[',
    ']',
    '\n',
    '<span class="keyword">for</span>',
    ' ',
    '(',
    ' ',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'key',
    ' ',
    '<span class="keyword">of</span>',
    ' ',
    'arr',
    ' ',
    ')',
    ' ',
    '{',
    '\n',
    '}',
    '\n',
    '<span class="keyword">for</span>',
    '(',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'key',
    ' ',
    '<span class="keyword">of</span>',
    ' ',
    'arr',
    ')',
    '{',
    '\n',
    '}',
    '\n',
    ' ',
    ' ',
  ])

}

async function test7() {
  const code = `
1 + 1
1+1
1 - 0
1-0
3 * 2
3*2
9 / 3
9/3
2 ** 5
2**5
a = 1
a=1
a += 1
a+=1
a -= 1
a-=1
a *= 2
a*=2
a /= 2
a/=2
a **= 2
a**=2
a == null
a==null
a === undefined
a===undefined
x != null
x!=null
x !== undefined
x!==undefined
a >= 1
a>=1
a > 0
a>0
a < 10
a<10
a <= 9
a<=9
isNaN(NaN)
isNaN ( NaN )
true ? 1 : 0
true?1:0
1 && 10
1&&10
0 || 2
0||2
null ?? 5
null??5
5 & 3
5&3
5 | 3
5|3
0 ^ 0
0^0
~ 0
~0
2 >> 0
2 << 4
a &= 3
a |= 3
a ^= 3
2n
1000n
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="number">1</span>',
    ' ',
    '<span class="operator">+</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    '<span class="number">1</span>',
    '<span class="operator">+</span>',
    '<span class="number">1</span>',
    '\n',
    '<span class="number">1</span>',
    ' ',
    '<span class="operator">-</span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">1</span>',
    '<span class="operator">-</span>',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">3</span>',
    ' ',
    '<span class="operator">*</span>',
    ' ',
    '<span class="number">2</span>',
    '\n',
    '<span class="number">3</span>',
    '<span class="operator">*</span>',
    '<span class="number">2</span>',
    '\n',
    '<span class="number">9</span>',
    ' ',
    '<span class="operator">/</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">9</span>',
    '<span class="operator">/</span>',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">2</span>',
    ' ',
    '<span class="operator">**</span>',
    ' ',
    '<span class="number">5</span>',
    '\n',
    '<span class="number">2</span>',
    '<span class="operator">**</span>',
    '<span class="number">5</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    'a',
    '<span class="operator">=</span>',
    '<span class="number">1</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">+=</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    'a',
    '<span class="operator">+=</span>',
    '<span class="number">1</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">-=</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    'a',
    '<span class="operator">-=</span>',
    '<span class="number">1</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">*=</span>',
    ' ',
    '<span class="number">2</span>',
    '\n',
    'a',
    '<span class="operator">*=</span>',
    '<span class="number">2</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">/=</span>',
    ' ',
    '<span class="number">2</span>',
    '\n',
    'a',
    '<span class="operator">/=</span>',
    '<span class="number">2</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">**=</span>',
    ' ',
    '<span class="number">2</span>',
    '\n',
    'a',
    '<span class="operator">**=</span>',
    '<span class="number">2</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">==</span>',
    ' ',
    '<span class="null">null</span>',
    '\n',
    'a',
    '<span class="operator">==</span>',
    '<span class="null">null</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">===</span>',
    ' ',
    '<span class="undefined">undefined</span>',
    '\n',
    'a',
    '<span class="operator">===</span>',
    '<span class="undefined">undefined</span>',
    '\n',
    'x',
    ' ',
    '<span class="operator">!=</span>',
    ' ',
    '<span class="null">null</span>',
    '\n',
    'x',
    '<span class="operator">!=</span>',
    '<span class="null">null</span>',
    '\n',
    'x',
    ' ',
    '<span class="operator">!==</span>',
    ' ',
    '<span class="undefined">undefined</span>',
    '\n',
    'x',
    '<span class="operator">!==</span>',
    '<span class="undefined">undefined</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">>=</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    'a',
    '<span class="operator">>=</span>',
    '<span class="number">1</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">></span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    'a',
    '<span class="operator">></span>',
    '<span class="number">0</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator"><</span>',
    ' ',
    '<span class="number">10</span>',
    '\n',
    'a',
    '<span class="operator"><</span>',
    '<span class="number">10</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator"><=</span>',
    ' ',
    '<span class="number">9</span>',
    '\n',
    'a',
    '<span class="operator"><=</span>',
    '<span class="number">9</span>',
    '\n',
    '<span class="global-object">isNaN</span>',
    '(',
    '<span class="not-a-number">NaN</span>',
    ')',
    '\n',
    '<span class="global-object">isNaN</span>',
    ' ',
    '(',
    ' ',
    '<span class="not-a-number">NaN</span>',
    ' ',
    ')',
    '\n',
    '<span class="boolean">true</span>',
    ' ',
    '<span class="operator">?</span>',
    ' ',
    '<span class="number">1</span>',
    ' ',
    '<span class="operator">:</span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="boolean">true</span>',
    '<span class="operator">?</span>',
    '<span class="number">1</span>',
    '<span class="operator">:</span>',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">1</span>',
    ' ',
    '<span class="operator">&&</span>',
    ' ',
    '<span class="number">10</span>',
    '\n',
    '<span class="number">1</span>',
    '<span class="operator">&&</span>',
    '<span class="number">10</span>',
    '\n',
    '<span class="number">0</span>',
    ' ',
    '<span class="operator">||</span>',
    ' ',
    '<span class="number">2</span>',
    '\n',
    '<span class="number">0</span>',
    '<span class="operator">||</span>',
    '<span class="number">2</span>',
    '\n',
    '<span class="null">null</span>',
    ' ',
    '<span class="operator">??</span>',
    ' ',
    '<span class="number">5</span>',
    '\n',
    '<span class="null">null</span>',
    '<span class="operator">??</span>',
    '<span class="number">5</span>',
    '\n',
    '<span class="number">5</span>',
    ' ',
    '<span class="operator">&</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">5</span>',
    '<span class="operator">&</span>',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">5</span>',
    ' ',
    '<span class="operator">|</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">5</span>',
    '<span class="operator">|</span>',
    '<span class="number">3</span>',
    '\n',
    '<span class="number">0</span>',
    ' ',
    '<span class="operator">^</span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">0</span>',
    '<span class="operator">^</span>',
    '<span class="number">0</span>',
    '\n',
    '<span class="operator">~</span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="operator">~</span>',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">2</span>',
    ' ',
    '<span class="operator">>></span>',
    ' ',
    '<span class="number">0</span>',
    '\n',
    '<span class="number">2</span>',
    ' ',
    '<span class="operator"><<</span>',
    ' ',
    '<span class="number">4</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">&=</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">|=</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    'a',
    ' ',
    '<span class="operator">^=</span>',
    ' ',
    '<span class="number">3</span>',
    '\n',
    '<span class="bigint">2n</span>',
    '\n',
    '<span class="bigint">1000n</span>',
    '\n',
    ' ',
    ' ',
  ])

}

async function test8() {
  const code = `
function f () {
  const x = 1
}

f ()

f

()
  `

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="function-keyword">function</span>',
    ' ',
    '<span class="function-name">f</span>',
    ' ',
    '(',
    ')',
    ' ',
    '{',
    '\n',
    ' ',
    ' ',
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    'x',
    ' ',
    '<span class="operator">=</span>',
    ' ',
    '<span class="number">1</span>',
    '\n',
    '}',
    '\n',
    '\n',
    '<span class="function-name">f</span>',
    ' ',
    '(',
    ')',
    '\n',
    '\n',
    '<span class="function-name">f</span>',
    '\n',
    '\n',
    '(',
    ')',
    '\n',
    ' ',
    ' '
  ])

}

async function test9() {
  const code = `// new nginx service is deploying to the docker swarm`

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '<span class="comment">// new nginx service is deploying to the docker swarm</span>',
  ])
}

async function test10() {
  const code = `
// \\n
//
`

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '\n',
    '<span class="comment">// \\n</span>',
    '\n',
    '<span class="comment">//</span>',
    '\n',
  ])
}

async function test11() {
  let code = `
'console.log(\\'Hello World.\\')'
"console.log(\\"Hello World.\\")"
  `.trim()
  code += '\n\`console.log(\\`Hello World.\\`)\`'

  const parsedElements = ArcheHighlight.parseJavaScript(code)

  assert.deepEqual(parsedElements, [
    '<span class="string">\'console.log(\\\'Hello World.\\\')\'</span>',
    '\n',
    '<span class="string">\"console.log(\\\"Hello World.\\\")\"</span>',
    '\n',
    '<span class="template-literal">\`console.log(\\\`Hello World.\\\`)\`</span>',
  ])
}

async function test12() {
  const code = `
200n
200n100
200
  `.trim()
  const parsedElements = ArcheHighlight.parseJavaScript(code)
  assert.deepEqual(parsedElements, [
    '<span class="bigint">200n</span>',
    '\n',
    '200n100',
    '\n',
    '<span class="number">200</span>',
  ])
}

async function test13() {
  const code = `\`$ $\{x\}\``
  const parsedElements = ArcheHighlight.parseJavaScript(code)
  assert.deepEqual(parsedElements, [
    '<span class="template-literal">`$ </span>',
    '<span class="template-variable">${x}</span>',
    '<span class="template-literal">`</span>',
  ])
}

async function test14() {
  const code = 'x{}'
  const parsedElements = ArcheHighlight.parseJavaScript(code)
  assert.deepEqual(parsedElements, [
    "x",
    "{",
    "}",
  ])
}

async function test15() {
  const code = 'const {x} = obj'
  const parsedElements = ArcheHighlight.parseJavaScript(code)
  assert.deepEqual(parsedElements, [
    '<span class="variable-declaration-keyword">const</span>',
    ' ',
    "{",
    "x",
    "}",
    ' ',
    '<span class="operator">=</span>',
    ' ',
    'obj',
  ])
}

setImmediate(async () => {
  await test1()
  await test2()
  await test3()
  await test4()
  await test5()
  await test6()
  await test7()
  await test8()
  await test9()
  await test10()
  await test11()
  await test12()
  await test13()
  await test14()
  await test15()
  console.log("success")
})
