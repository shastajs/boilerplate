import { compose } from 'compose-middleware'
import errorHandler from 'errorhandler'
import pmx from 'pmx'

export default compose([
  errorHandler(),
  pmx.expressErrorHandler()
])
