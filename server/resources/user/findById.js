import Model from './model'
import { screenDeep } from 'palisade'
import changeStream from 'rethinkdb-change-stream'

export const tailable = true
export const isAuthorized = ({ model, id }) =>
  Model.authorized('read', model, { id })

export const process = ({ tail, id }) =>
  tail
    ? changeStream(Model.filter({ id }).changes({ includeInitial: true }))
    : Model.get(id).run()

export const format = ({ model }, data) =>
  screenDeep(model, data)
