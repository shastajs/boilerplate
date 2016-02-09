import logger from 'shasta-logger'
import { middleware as router } from 'shasta-router'
// import { middleware as storage } from './storageEngine'

export default [
  router,
  logger
  // storage
]
