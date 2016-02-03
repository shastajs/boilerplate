import webpack from 'webpack'

export default (webpackConfig) => {
  delete webpackConfig.devtool

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true
      }
    })
  )

  return webpackConfig
}
