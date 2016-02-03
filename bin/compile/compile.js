import webpack from 'webpack'
import webpackCfg from '../../webpack'
import _debug from 'debug'
const debug = _debug('app:bin:compile')

debug('Starting webpack compiler.')

const compiler = webpack(webpackCfg)

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString())

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')
  } else {
    debug('No errors or warnings encountered.')
  }
})
