import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default [
  {
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?indentedSyntax&sourceMap&sourceMapContents')
  }
]
