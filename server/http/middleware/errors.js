import { compose } from 'compose-middleware'
import errorHandler from 'errorhandler'
import pmx from 'pmx'

export default compose([
  errorHandler(),
  pmx.expressErrorHandler(),
  (err, req, res, next) => {
    console.error(err)
    res.status(500)
    res.end()
    next()
  }
])
