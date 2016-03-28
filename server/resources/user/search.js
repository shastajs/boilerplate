import Model from './model'
import { screenDeep } from 'palisade'
import map from 'lodash.map'
import escape from 'escape-string-regexp'
import { r } from 'connections/rethink'
import changeStream from 'rethinkdb-change-stream'

export const http = {
  method: 'get',
  instance: false
}
export const tailable = true
export const isAuthorized = ({ model }) =>
  Model.authorized('list', model)

// TODO: support nested?
export const process = ({ options, tail }) => {
  const query  = Model.filter((u) =>
    r.or(
      ...map(options, (v, k) =>
        u(k).match(escape(v))
      )
    )
  )
  return tail
    ? changeStream(query.changes({ includeInitial: true }))
    : query.run()
}

export const format = ({ model }, data) =>
  screenDeep(model, data)
