import User from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ id, user }) =>
  User.authorized('delete', user, { id })

export const process = ({ id }) =>
  User.purge(id).run()

export const format = ({ user }, data) =>
  screenDeep(user, data)
