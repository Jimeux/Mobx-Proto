/**
 * This script is recommended by the authors of Enzyme.
 * http://airbnb.io/enzyme/docs/guides/jsdom.html
 */

const jsdom = require('jsdom').jsdom;

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

const chaiEnzyme = require('chai-enzyme')
const chai = require('chai')
chai.use(chaiEnzyme())