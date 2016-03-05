import User from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user, id }) =>
  User.authorized('update', user, { id })

export const process = ({ user, id, data }) => {
  const change = User.screen('write', user, data)
  User.get(id).update(change, { returnChanges: true }).execute()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
