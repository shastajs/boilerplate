import config from 'app-config-chain'
import thinky from 'thinky'
import chalk from 'chalk'
import _debug from 'debug'
const debug = _debug('app:db:rethink')

const db = thinky(config.rethink)

db.r.getPoolMaster()._flushErrors = () => {}
// db.r.getPoolMaster().on('log', (msg) => {})

db.r.getPoolMaster().on('healthy', (healthy) => {
  if (healthy) {
    debug('RethinkDB connected!')
  } else {
    debug(chalk.red('RethinkDB failed to connect!'))
  }
})

export default db
