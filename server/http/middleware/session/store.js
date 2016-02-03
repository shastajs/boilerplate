const session = require('express-session')
const redis = require('connections/redis')
const SessionStore = require('connect-redis')(session)

module.exports = new SessionStore({
  client: redis
})
