import express from 'express'
import http from 'http'
import config from 'app-config-chain'

// middleware is required instead of imported
// so we can conditionally load deps

const app = express()
app.disable('x-powered-by')

// middleware stack
app.use(require('./middleware/errors'))
app.use(require('./middleware/formatting'))
app.use(require('./middleware/session'))
app.use(require('./middleware/auth'))
app.use(config.api.path, require('./middleware/api'))

// final piece - serve static content
app.use(require('./middleware/spa'))

if (config.env === 'development') {
  app.use(require('./middleware/webpack'))
} else {
  app.use(express.static(config.paths.dist))
}

const httpServer = http.createServer(app)

export default httpServer
