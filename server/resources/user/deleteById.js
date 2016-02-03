import User from './model'

export default (opt, cb) => {
  if (!User.authorized('delete', opt.user)) {
    return cb({status: 403})
  }

  User.delete(opt.id)
    .execute((err, res) => {
      cb(err, res && new User(res.changes[0].old_val))
    })
}
