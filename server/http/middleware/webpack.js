import webpack from 'webpack'
import {compose} from 'compose-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../webpack'

const compiler = webpack(webpackConfig)

export default compose([
  WebpackDevMiddleware(compiler, webpackConfig.devServer),
  WebpackHotMiddleware(compiler)
])
