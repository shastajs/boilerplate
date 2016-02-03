import User from './model'

export default (opt, cb) => {
  if (!User.authorized('update', opt.user, {id: opt.id})) {
    return cb({status: 403})
  }

  var change = User.screen('write', opt.user, opt.data)
  User.get(opt.id)
    .update(change, {returnChanges: true})
    .execute((err, res) => {
      cb(err, res && new User(res.changes[0].new_val))
    })
}
