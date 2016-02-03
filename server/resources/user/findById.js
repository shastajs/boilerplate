import User from './model'
import changeStream from 'rethinkdb-change-stream'

export default (opt, cb) => {
  if (!User.authorized('read', opt.user)) {
    return cb({status: 403})
  }

  if (opt.tail) {
    return changeStream(User.filter({id: opt.id}).changes())
  } else {
    User.get(opt.id).run(cb)
  }
}
