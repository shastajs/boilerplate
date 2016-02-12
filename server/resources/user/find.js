import User from './model'
import decl from 'rethink-decl'
import { screenDeep } from 'palisade'

export const tailable = true
export const isAuthorized = (opt, cb) =>
  // cb(null, User.authorized('list', opt.user))
  cb(null, true)

export const createQuery = (opt, cb) =>
  cb(null, decl(User, {
    ...opt.options,
    tail: opt.tail
  }))

export const formatResponse = (opt, data) =>
  screenDeep(opt.user, data)
