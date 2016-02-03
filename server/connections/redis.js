import redis from 'redis'
import config from 'app-config-chain'
import chalk from 'chalk'
import _debug from 'debug'
const debug = _debug('app:db:redis')

const client = redis.createClient(config.redis)
client.on('error', err => debug(chalk.red(err)))
client.on('connect', () => debug('Redis connected'))
client.on('reconnecting', () => debug(chalk.yellow('Redis reconnecting')))

export default client
