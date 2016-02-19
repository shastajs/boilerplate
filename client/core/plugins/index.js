import * as logger from 'shasta-logger'
import * as router from 'shasta-router'
import * as forms from 'shasta-forms'
import * as api from 'tahoe'
import * as hotReload from './hotReload'

export default [
  logger,
  api,
  router,
  forms,
  hotReload
]
