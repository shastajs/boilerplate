import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import * as redirect from '../redirect'
import User from 'resources/user/model'
import { salt } from 'app-config-chain'
import md5 from '../md5'

const providerName = 'local'
const dataToUser = (username, password) => ({
  id: md5(`${providerName}-${username}`),
  email: username,
  lastLogin: Date.now(),

  [providerName]: {
    id: username,
    accessToken: md5(`${providerName}-${password}-${salt}`)
  }
})

const isPasswordEqual = (a, b) =>
  a[providerName].accessToken === b[providerName].accessToken

const getUserById = (id, cb) => {
  User.get(id).run((err, existing) => {
    if (err && err.name !== 'DocumentNotFoundError') {
      return cb(err)
    }
    cb(null, existing)
  })
}

const createOrUpdateUser = (newData, cb) => {
  User.insert(newData, {
    conflict: 'update',
    returnChanges: true
  }).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}

const findOrCreateUser = (username, password, cb) => {
  const maybeUser = new User(dataToUser(username, password))
  getUserById(maybeUser.id, (err, existing) => {
    if (err) return cb(err)
    if (existing && !isPasswordEqual(maybeUser, existing)) {
      return cb(null, false, { message: 'Invalid username or password' })
    }
    createOrUpdateUser(maybeUser, cb)
  })
}

// init the passport junk
const strategy = new Strategy(findOrCreateUser)
passport.use(strategy)

// init the router
const start = passport.authenticate(providerName)
const router = Router({ mergeParams: true })
router.post(`/auth/${providerName}/start`, redirect.pre, start, redirect.postBody)

export default router
