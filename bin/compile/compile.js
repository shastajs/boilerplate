import webpack from 'webpack'
import chalk from 'chalk'
import webpackCfg from '../../webpack'
import _debug from 'debug'
const debug = _debug('app:bin:compile')

debug(`Environment is set to: ${process.env.NODE_ENV || 'default'}`)
debug('Webpack compiler starting to build')

const compiler = webpack(webpackCfg)

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson()

  debug('Compilation completed!')
  console.log(stats.toString())

  if (err) {
    debug(chalk.red(err))
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug(chalk.red(jsonStats.errors))
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug(chalk.yellow(jsonStats.warnings))
  }
})
