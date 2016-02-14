import User from './model'
import { screenDeep } from 'palisade'

export const tailable = false
export const isAuthorized = (opt, cb) =>
  cb(null, User.authorized('create', opt.user))

export const createQuery = (opt, cb) => {
  const doc = User.screen('write', opt.user, opt.data)
  cb(null, User.insert(new User(doc), { returnChanges: true }))
}

export const formatResponse = (opt, data) =>
  screenDeep(opt.user, data)
