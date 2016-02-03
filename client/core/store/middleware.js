import logger from 'shasta-logger'
import { middleware as routerMiddleware } from 'shasta-router'
import storage from './storageEngine'

export default [
  routerMiddleware,
  storage.middleware,
  logger
]
