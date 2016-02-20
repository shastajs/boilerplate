import rethink from 'connections/rethink'
import palisade from 'palisade'
const { type } = rethink

const User = rethink.createModel('User', {
  // core fields
  id: type.string(),
  role: type.string().enum([
    'pleb',
    'admin'
  ]).default('pleb'),
  times: {
    created: type.date().default(Date.now),
    lastModified: type.date().default(Date.now),
    lastLogin: type.date().default(Date.now)
  },

  // auth info
  facebook: {
    id: type.string(),
    accessToken: type.string()
  },
  google: {
    id: type.string(),
    accessToken: type.string()
  },

  // user info
  name: type.string(),
  email: type.string().email(),
  location: type.string()
})

palisade(User, {
  document: {
    read: [ 'public' ],
    list: [ 'loggedIn' ],
    create: [ 'admin' ],
    update: [ 'admin', 'self' ],
    replace: [ 'admin' ],
    delete: [ 'admin' ]
  },
  read: {
    id: [ 'public' ],
    role: [ 'admin', 'self' ],
    times: [ 'admin', 'self' ],
    facebook: [ 'admin' ],
    name: [ 'public' ],
    email: [ 'admin', 'self' ],
    location: [ 'loggedIn' ]
  },
  write: {
    id: [ 'admin' ],
    role: [ 'admin' ],
    times: [ 'admin' ],
    facebook: [ 'admin' ],
    name: [ 'admin', 'self' ],
    email: [ 'admin', 'self' ],
    location: [ 'admin', 'self' ]
  }
})

// other junk
User.pre('save', (next) => {
  this.times.lastModified = Date.now()
  next()
})

export default User
