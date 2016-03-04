import User from './model'
import { screenDeep } from 'palisade'
import changeStream from 'rethinkdb-change-stream'

export const tailable = true
export const isAuthorized = ({ user, id }) =>
  User.authorized('read', user, { id })

export const process = ({ tail, id }) =>
  tail ? changeStream(User.filter({ id }).changes()) : User.get(id)

export const format = ({ user }, data) =>
  screenDeep(user, data)
