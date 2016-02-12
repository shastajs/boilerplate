import User from './model'
import { screenDeep } from 'palisade'

export const tailable = false
export const isAuthorized = (opt, cb) =>
  cb(null, User.authorized('delete', opt.user, { id: opt.id }))

export const createQuery = (opt, cb) =>
  cb(null, User.delete(opt.id))

export const formatResponse = (opt, data) =>
  screenDeep(opt.user, data)
