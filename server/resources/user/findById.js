import User from './model'
import { screenDeep } from 'palisade'

export const tailable = true
export const isAuthorized = (opt, cb) =>
  cb(null, User.authorized('read', opt.user, { id: opt.id }))

export const createQuery = (opt, cb) => {
  if (opt.tail) {
    cb(null, User.filter({ id: opt.id }).changes())
  } else {
    cb(null, User.get(opt.id))
  }
}

export const formatResponse = (opt, data) =>
  screenDeep(opt.user, data)
