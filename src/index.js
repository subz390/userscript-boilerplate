import {multiply} from '../tests/maths.js'
import {makeHTML, styleInject, getChar, sprintf} from '@subz390/jsutils'


// Test we can import and insert CSS using rollup-plugin-import-css
import stylesheet from './style.css'

// This is an example on how to substitute uniqueId's in the stylesheet
// sprintf replaces __uid__ in the css with the value of uniqueId at runtime
const uniqueId = getChar(8, '#hex')
styleInject(sprintf({regex: /__([^_]+)__/g, template: stylesheet}, {uid: uniqueId}), 'darkmode')

// rollup-plugin-modify
// test removal of debug code in release builds
// const debug = true
// debug && console.log('This message will be here when debug is true')

// rollup-plugin-node-resolve
// test importing and bundling ES6 modules from node_modules
// console.info('getChar(32, \'abcdef0123456789\'):', getChar(32, 'abcdef0123456789'))

// makeHTML
// For test purpose this is a combination of building an HTML string and using DOM methods to attach to the page
// The css is loaded from the `src/style.css` file by rollup-plugin-postcss, see rollup.config.js for config
// The css will be minified and inserted into the bundled JS file
let htmlString = ''
for (let j = 1; j <= 12; j++) {
  htmlString += `<li class="heading">${j}</li><li><pre>`
  for (let i = 1; i <= 12; i++) {
    htmlString += `${j} * ${i.toString().padEnd(2, ' ')} = ${multiply(j, i)}\n`
  }
  htmlString += '</pre></li>'
}
makeHTML({
  myTestNode: {
    parentNode: 'body',
    tagName: 'div',
    id: `el-${uniqueId}`,
    innerHTML: htmlString
  }
})
