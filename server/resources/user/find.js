import Model from './model'
import decl from 'rethink-decl'
import { screenDeep } from 'palisade'
import changeStream from 'rethinkdb-change-stream'

export const tailable = true
export const isAuthorized = ({ model }) =>
  Model.authorized('list', model)

export const process = ({ options, tail }) => {
  const query = decl(Model, options)
  return tail
    ? changeStream(query.changes({ includeInitial: true }))
    : query.run()
}

export const format = ({ model }, data) =>
  screenDeep(model, data)
