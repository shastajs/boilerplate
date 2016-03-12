import { http } from 'app-config-chain'
import server from '../../server'
import _debug from 'debug'
const debug = _debug('app:bin:server')

debug(`Environment is set to: ${process.env.NODE_ENV || 'default'}`)
debug(`Server starting at ${http.host}:${http.port}`)
server.listen(http.port, http.host)
