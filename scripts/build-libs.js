const shell = require('shelljs')
const path = require('path')
const components = require('../components.json')

Object.keys(components).forEach(item => {
  shell.exec(`node ${path.join(__dirname, 'build-lib.js')} ${item}`)
})
