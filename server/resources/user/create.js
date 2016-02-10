import User from './model'

export default (opt, cb) => {
  if (!User.authorized('create', opt.user)) {
    return cb({ status: 403 })
  }

  const doc = User.screen('write', opt.user, opt.data)
  User.insert(doc, { returnChanges: true }).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}
