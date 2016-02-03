import User from './model'

export default (opt, cb) => {
  if (!User.authorized('replace', opt.user, {id: opt.id})) {
    return cb({status: 403})
  }

  var change = User.screen('write', opt.user, opt.data)
  User.get(opt.id)
    .replace(change, {returnChanges: true})
    .execute((err, res) => {
      cb(err, res && new User(res.changes[0].new_val))
    })
}
