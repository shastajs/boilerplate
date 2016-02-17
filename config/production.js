import fs from 'fs'
import path from 'path'

const rethinkCert = fs.readFileSync(path.join(__dirname, './rethinkdb.ca'), 'utf8')

const config = {
  // databases
  redis: process.env.REDIS_URL,

  rethink: {
    silent: true,
    host: 'your-host (compose.io is cool)',
    port: 11244,
    db: 'stack',
    authKey: 'get-your-own',
    ssl: {
      ca: rethinkCert
    },
    enforce_extra: 'remove'
  },

  http: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },

  // auth stuff
  facebook: {
    id: 'get-your-own',
    secret: 'get-your-own',
    scope: [
      'email',
      'public_profile',
      'user_about_me',
      'user_birthday',
      'user_location'
    ]
  }
}

export default config
