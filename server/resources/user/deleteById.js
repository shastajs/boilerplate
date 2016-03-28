import Model from './model'
import { screenDeep } from 'palisade'

export const isAuthorized = ({ id, model }) =>
  Model.authorized('delete', model, { id })

export const process = ({ id }) =>
  Model.purge(id).run()

export const format = ({ model }, data) =>
  screenDeep(model, data)
