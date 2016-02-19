import config from 'app-config-chain'
import thinky from 'thinky'
import chalk from 'chalk'
import _debug from 'debug'
const debug = _debug('app:db:rethink')

const db = thinky(config.rethink)

let connected = false
db.r.getPoolMaster().on('available-size', (size) => {
  if (connected) return
  debug(`RethinkDB connected (${size})`)
  connected = true
})
db.r.getPoolMaster()._flushErrors = () => {}

db.r.getPoolMaster().on('healthy', (healthy) => {
  if (healthy) {
    debug('RethinkDB reconnected')
  } else {
    debug(chalk.red('RethinkDB failed to connect'))
  }
})

export default db
