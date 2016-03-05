import User from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user, id }) =>
  User.authorized('replace', user, { id })

export const process = ({ id, user, data }) => {
  const change = User.screen('write', user, data)
  User.get(id).replace(new User(change), { returnChanges: true }).execute()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
