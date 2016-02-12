import User from './model'
import { screenDeep } from 'palisade'

export const tailable = false
export const isAuthorized = (opt, cb) =>
  cb(null, User.authorized('replace', opt.user, { id: opt.id }))

export const createQuery = (opt, cb) => {
  const change = User.screen('write', opt.user, opt.data)
  cb(null, User.get(opt.id).replace(change, { returnChanges: true }))
}

export const formatResponse = (opt, data) =>
  screenDeep(opt.user, data)
