import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-facebook'
import config from 'app-config-chain'
import crypto from 'crypto'
import { r } from 'connections/rethink'
import User from 'resources/user/model'

const md5 = (str) =>
  crypto.createHash('md5').update(str).digest('hex')

const dataToUser = (data) => new User({
  id: md5(`fb-${data.id}`),
  name: data.name,
  email: data.email,
  times: {
    lastLogin: r.now()
  },
  facebook: {
    id: data.id,
    accessToken: data.accessToken
  }
})

const findOrCreateUser = (accessToken, refreshToken, profile, cb) => {
  User.insert(
    dataToUser({ ...profile._json, accessToken: accessToken })
  ,
    { conflict: 'update', returnChanges: true }
  ).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}

const userToString = (user, cb) => cb(null, user.id)
const stringToUser = (id, cb) => User.get(id).run((_, res) =>
  cb(null, res || false)
)

const storeRedirect = (req, res, next) => {
  if (req.session) req.session.redirectTo = null
  if (!req.query.to) return next()
  if (req.session) req.session.redirectTo = req.query.to
  next()
}
const performRedirect = (req, res) => {
  if (req.session && req.session.redirectTo) {
    return res.redirect(`/${req.session.redirectTo}`)
  }
  res.redirect('/')
}

// init the passport junk
const strategyConfig = {
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  scope: config.facebook.scope,
  callbackURL: '/auth/facebook/callback',
  enableProof: true,
  display: 'touch'
}
const strategy = new Strategy(strategyConfig, findOrCreateUser)
passport.use(strategy)
passport.serializeUser(userToString)
passport.deserializeUser(stringToUser)

// init the router
const start = passport.authenticate('facebook', {
  display: strategyConfig.display
})

const callback = passport.authenticate('facebook', {
  display: strategyConfig.display,
  failureRedirect: '/login'
})
const router = Router({ mergeParams: true })
router.get('/auth/facebook/start', storeRedirect, start)
router.get('/auth/facebook/callback', callback, performRedirect)

export default router
