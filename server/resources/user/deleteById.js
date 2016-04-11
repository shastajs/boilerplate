import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ id, user }) =>
  Model.authorized('delete', user, { id })

export const process = ({ id }) =>
  Model.purge(id).run()

export const format = ({ user }, data) =>
  screenDeep(user, data)
