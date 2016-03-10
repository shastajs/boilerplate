import webpack from 'webpack'
import cssnano from 'cssnano'
import rucksack from 'rucksack-css'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from 'app-config-chain'
import path from 'path'
import requireDir from 'require-dir'
import sutro, { load } from 'sutro'

const lFolder = requireDir('./loaders')
const loaders = Object.keys(lFolder).reduce((p, k) => p.concat(lFolder[k]), [])

const initialState = {
  resources: sutro({
    prefix: config.api.path,
    resources: load(config.paths.resources)
  }).meta
}

const globals = {
  '__INITIAL_STATE__': JSON.stringify(initialState),
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development', // used in react
  '__PROD__': config.env === 'production' // used in react
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      path.join(config.paths.client, './index.js')
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: config.paths.dist,
    publicPath: config.paths.public
  },
  plugins: [
    // new NpmCheckPlugin({autoInstall: false}),
    new webpack.DefinePlugin(globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.client, 'index.html'),
      hash: false,
      favicon: path.join(config.paths.client, 'assets/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  ],
  resolve: {
    modulesDirectories: [ 'node_modules' ],
    root: config.paths.client,
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: loaders
  },
  sassLoader: {
    includePaths: path.join(config.paths.client, 'styles')
  },
  postcss: [
    rucksack({
      autoprefixer: true
    }),
    cssnano({
      sourcemap: globals.__DEV__,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: [ 'last 2 versions' ]
      },
      discardComments: {
        removeAll: true
      }
    })
  ],
  eslint: {}
}

export default webpackConfig
