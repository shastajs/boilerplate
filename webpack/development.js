/* eslint key-spacing:0 */
import webpack from 'webpack'
import config from 'app-config-chain'

export default (webpackConfig) => {
  webpackConfig.devServer = {
    publicPath: config.paths.public,
    contentBase: config.paths.client,
    noInfo: true,
    stats: 'errors-only',
    hot: true,
    lazy: false
  }

  webpackConfig.devtool = 'source-map'

  webpackConfig.entry.app.push(
    'webpack-hot-middleware/client?path=/__webpack_hmr'
  )

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )

  webpackConfig.eslint.emitWarning = true

  webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
    if (!/babel/.test(loader.loader)) return loader

    if (loader.query.env.development.plugins[0][0] !== 'react-transform') {
      console.error('ERROR: react-transform must be the first plugin')
      return loader
    }

    const reactTransformHmr = {
      transform: 'react-transform-hmr',
      imports: [ 'react' ],
      locals: [ 'module' ]
    }
    loader.query.env.development.plugins[0][1].transforms
      .push(reactTransformHmr)
    return loader
  })

  return webpackConfig
}
