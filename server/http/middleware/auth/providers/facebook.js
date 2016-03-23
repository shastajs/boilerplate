import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-facebook'
import config from 'app-config-chain'

import findOrCreateUser from '../findOrCreateUser'
import md5 from '../md5'
import * as redirect from '../redirect'

const providerName = 'facebook'
const dataToUser = (data) => ({
  id: md5(`${providerName}-${data.id}`),
  name: data.name,
  email: data.email,
  lastLogin: Date.now(),
  [providerName]: {
    id: data.id,
    accessToken: data.accessToken
  }
})

// init the passport junk
const strategyConfig = {
  clientID: config[providerName].id,
  clientSecret: config[providerName].secret,
  scope: config[providerName].scope,
  callbackURL: `/auth/${providerName}/callback`,
  enableProof: true,
  display: 'touch'
}
const strategy = new Strategy(strategyConfig, findOrCreateUser(dataToUser))
passport.use(strategy)

// init the router
const start = passport.authenticate(providerName, {
  display: strategyConfig.display
})

const callback = passport.authenticate(providerName, {
  display: strategyConfig.display,
  failureRedirect: '/login'
})
const router = Router({ mergeParams: true })
router.get(`/auth/${providerName}/start`, redirect.pre, start)
router.get(`/auth/${providerName}/callback`, callback, redirect.post)

export default router
