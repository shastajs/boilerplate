import rethink from 'connections/rethink'
import palisade from 'palisade'
const { type } = rethink

const Model = rethink.createModel('User', {
  // core fields
  id: type.string(),
  role: type.string().enum([
    'pleb',
    'admin'
  ]).default('pleb'),

  created: type.date().default(Date.now),
  lastModified: type.date().default(Date.now),
  lastLogin: type.date().default(Date.now),

  // auth info
  facebook: {
    id: type.string(),
    accessToken: type.string()
  },
  google: {
    id: type.string(),
    accessToken: type.string()
  },
  github: {
    id: type.string(),
    accessToken: type.string()
  },
  local: {
    id: type.string(),
    accessToken: type.string()
  },

  // user info
  name: type.string(),
  email: type.string().email(),
  count: type.number().default(0),
  location: type.string()
})

Model.ensureIndex('created')

Model.ready().then(() => {
  // import and set up relationships here
})

palisade(Model, {
  document: {
    read: [ 'loggedIn' ],
    list: [ 'loggedIn' ],
    create: [ 'admin' ],
    update: [ 'admin', 'self' ],
    replace: [ 'admin' ],
    delete: [ 'admin' ]
  },
  read: {
    id: [ 'loggedIn' ],
    role: [ 'loggedIn' ],
    name: [ 'loggedIn' ],
    location: [ 'loggedIn' ],
    count: [ 'loggedIn' ],
    created: [ 'loggedIn' ],
    lastModified: [ 'admin', 'self' ],
    lastLogin: [ 'admin', 'self' ],
    email: [ 'admin', 'self' ]
  },
  write: {
    role: [ 'admin' ],
    name: [ 'admin', 'self' ],
    email: [ 'admin', 'self' ],
    location: [ 'admin', 'self' ],
    count: [ 'loggedIn' ]
  }
})

// other junk
Model.pre('save', function (next) {
  this.lastModified = Date.now()
  next()
})

export default Model
