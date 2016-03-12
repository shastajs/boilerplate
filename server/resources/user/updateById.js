import User from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user, id }) =>
  User.authorized('update', user, { id })

export const process = ({ user, id, data }) => {
  const change = User.screen('write', user, data)
  return User.get(id).update(change, { returnChanges: true }).run()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
