const session = require('express-session')
const config = require('app-config-chain')
const store = require('./store')

module.exports = session({
  store: store,
  name: config.cookie.name,
  secret: config.cookie.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 31536000000
  }
})
