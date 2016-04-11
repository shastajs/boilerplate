import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user, id }) =>
  Model.authorized('update', user, { id })

export const process = ({ user, id, data }) => {
  const change = Model.screen('write', user, data)
  return Model.get(id).update(change, { returnChanges: true }).run()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
