import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ model }) =>
  Model.authorized('create', model)

export const process = ({ model, data }) => {
  const doc = Model.screen('write', model, data)
  return Model.insert(new Model(doc), { returnChanges: true }).run()
}

export const format = ({ model }, data) =>
  screenDeep(model, data)
