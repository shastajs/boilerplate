import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ model, id }) =>
  Model.authorized('replace', model, { id })

export const process = ({ id, model, data }) => {
  const change = Model.screen('write', model, data)
  Model.get(id).replace(new Model(change), { returnChanges: true }).run()
}

export const format = ({ model }, data) =>
  screenDeep(model, data)
