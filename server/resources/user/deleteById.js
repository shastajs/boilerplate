import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ id, user }) =>
  Model.authorized('delete', user, { id })

export const process = ({ id }) =>
  Model.get(id).run().then((i) => i.purge())

export const format = ({ user }, data) =>
  screenDeep(user, data)
