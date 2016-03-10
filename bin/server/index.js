const path = require('path')
const modPath = require('app-module-path')
modPath.addPath(path.join(__dirname, '../../server'))

require('babel-register')
require('./server')
