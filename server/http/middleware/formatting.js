import config from 'app-config-chain'
import compress from 'compression'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {compose} from 'compose-middleware'

export default compose([
  compress(),
  methodOverride(),
  bodyParser.json({
    strict: true,
    limit: '10mb'
  }),
  cookieParser(config.cookie.secret)
])
