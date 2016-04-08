const getRedirect = (req) =>
  req.session && req.session.redirectTo
    ? `/${req.session.redirectTo}`
    : '/'

export const pre = (req, res, next) => {
  if (req.session) req.session.redirectTo = null
  if (!req.query.redirectTo) return next()
  if (req.session) req.session.redirectTo = req.query.redirectTo
  next()
}

export const post = (req, res) => {
  res.redirect(getRedirect(req))
}

export const postBody = (req, res) => {
  res.json({
    redirectTo: getRedirect(req),
    me: req.user ? req.user.screen('read', req.user) : null
  })
}
