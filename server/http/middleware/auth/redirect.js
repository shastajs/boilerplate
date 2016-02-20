export const pre = (req, res, next) => {
  if (req.session) req.session.redirectTo = null
  if (!req.query.to) return next()
  if (req.session) req.session.redirectTo = req.query.to
  next()
}

export const post = (req, res) => {
  if (req.session && req.session.redirectTo) {
    return res.redirect(`/${req.session.redirectTo}`)
  }
  res.redirect('/')
}
