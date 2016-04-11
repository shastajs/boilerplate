import { compose } from 'compose-middleware'
import { Router } from 'express'
import passport from 'passport'
import User from 'resources/user/model'
import path from 'path'
import requireDir from 'require-dir'
import values from 'lodash.values'

const providers = values(requireDir(path.join(__dirname, './providers')))
const userToId = (user, cb) =>
  cb(null, user.id)

const getUserById = (id, cb) => {
  User.get(id).run((err, existing) => {
    if (err && err.name !== 'DocumentNotFoundError') {
      return cb(err)
    }
    cb(null, existing || false)
  })
}

const router = Router({ mergeParams: true })

passport.serializeUser(userToId)
passport.deserializeUser(getUserById)

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/initialState.js', (req, res) => {
  const initialState = {
    me: req.user ? req.user.screen('read', req.user) : null
  }
  res.status(200)
  res.type('text/javascript')
  res.send(`window.__INITIAL_STATE__ = (${JSON.stringify(initialState)});`)
  res.end()
})

export default compose([
  passport.initialize(),
  passport.session(),
  ...providers,
  router
])
