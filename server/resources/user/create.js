import User from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user }) =>
  User.authorized('create', user)

export const process = ({ user, data }) => {
  const doc = User.screen('write', user, data)
  return User.insert(new User(doc), { returnChanges: true })
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
