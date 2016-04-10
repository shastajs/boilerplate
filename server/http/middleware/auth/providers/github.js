import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-github'
import config from 'app-config-chain'

import findOrCreateUser from '../findOrCreateOAuth'
import md5 from '../md5'
import * as redirect from '../redirect'

const providerName = 'github'
const dataToUser = (data) => {
  console.log(data)
  return ({
    id: md5(`${providerName}-${data.id}`),
    name: data.name,
    email: data.email,
    lastLogin: Date.now(),

    [providerName]: {
      id: String(data.id),
      accessToken: data.accessToken
    }
  })
}

// init the passport junk
const strategyConfig = {
  clientID: config[providerName].id,
  clientSecret: config[providerName].secret,
  callbackURL: `/auth/${providerName}/callback`
}
const strategy = new Strategy(strategyConfig, findOrCreateUser(dataToUser))
passport.use(strategy)

// init the router
const start = passport.authenticate(providerName)
const callback = passport.authenticate(providerName, {
  failureRedirect: '/login'
})

const router = Router({ mergeParams: true })
router.get(`/auth/${providerName}/start`, redirect.pre, start)
router.get(`/auth/${providerName}/callback`, callback, redirect.post)

export default router
