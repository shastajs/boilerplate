import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ model, id }) =>
  Model.authorized('update', model, { id })

export const process = ({ model, id, data }) => {
  const change = Model.screen('write', model, data)
  return Model.get(id).update(change, { returnChanges: true }).run()
}

export const format = ({ model }, data) =>
  screenDeep(model, data)
