/**
 * @name userscript-boilerplate
 * @license MIT
 * @description this file demonstrates the functionality of the boilerplate development environment as it's configured in rollup.config.js
 */

import {multiply} from '../tests/maths.js'

// @rollup/plugin-node-resolve
// import and bundle dependencies as ES6 modules from node_modules
import {makeHTML, styleInject, getChar, sprintf} from '@subz390/jsutils'

// rollup-plugin-import-css
// import and insert CSS
import stylesheet from './style.css'

// Here's an example how to substitute uniqueId's in a stylesheet
// sprintf replaces __uid__ in the css with the value of uniqueId at runtime
const uniqueId = getChar(8, '#hex')
styleInject(sprintf({regex: /__([^_]+)__/g, template: stylesheet}, {uid: uniqueId}), 'darkmode')

// rollup-plugin-modify
// remove debug code
const debug = true
debug && console.log('This message will be here when debug is true')


// build an HTML string and insert using DOM methods
let htmlString = ''
for (let j = 1; j <= 12; j++) {
  htmlString += `<li class="heading">${j}</li><li><pre>`
  for (let i = 1; i <= 12; i++) {htmlString += `${j} * ${i.toString().padEnd(2, ' ')} = ${multiply(j, i)}\n`}
  htmlString += '</pre></li>'
}
let containerElement = document.createElement('div')
containerElement.setAttribute('id', `el-${uniqueId}`)
containerElement.innerHTML = htmlString
document.body.appendChild(containerElement)


// build the same HTML as above using makeHTML
makeHTML({
  container: {
    parentNode: 'body',
    tagName: 'div',
    id: `el-${uniqueId}`,
    appendNodes: () => {
      let nodes = []
      for (let j = 1; j <= 12; j++) {
        nodes.push(makeHTML({
          heading: {
            tagName: 'li',
            className: 'heading',
            textContent: `${j}`
          },
          wrapper: {
            tagName: 'li',
            childNodes: {
              content: {
                tagName: 'pre',
                textContent: (() => {
                  let string = ''
                  for (let i = 1; i <= 12; i++) {string += `${j} * ${i.toString().padEnd(2, ' ')} = ${multiply(j, i)}\n`}
                  return string
                })()
              }
            }
          }
        }))
      }
      // console.log('nodes', nodes)
      return nodes
    }
  }
})
