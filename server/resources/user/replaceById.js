import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ user, id }) =>
  Model.authorized('replace', user, { id })

export const process = ({ id, user, data }) => {
  const change = Model.screen('write', user, data)
  Model.get(id).replace(new Model(change), { returnChanges: true }).run()
}

export const format = ({ user }, data) =>
  screenDeep(user, data)
