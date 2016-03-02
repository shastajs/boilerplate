import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from 'app-config-chain'

let loader = 'style!css?sourceMap!postcss!sass?indentedSyntax&sourceMap&sourceMapContents'
if (config.env === 'production') {
  loader = ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?indentedSyntax&sourceMap&sourceMapContents')
}

export default [
  {
    test: /\.sass$/,
    loader: loader
  }
]
