var path = require('path')
var modPath = require('app-module-path')
modPath.addPath(path.join(__dirname, '../../server'))
modPath.addPath(path.join(__dirname, '../../local_modules'))

require('babel-register')
require('./server')
