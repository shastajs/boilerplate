import * as logger from 'shasta-logger'
import * as router from 'shasta-router'
import * as api from 'tahoe'
import * as hotReload from './hotReload'

export default [
  logger,
  api,
  router,
  hotReload
]
