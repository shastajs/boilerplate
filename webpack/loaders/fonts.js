export default [
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/font-woff2'
    }
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'application/octet-stream'
    }
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]'
    }
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url',
    query: {
      prefix: 'fonts/',
      name: '[path][name].[ext]',
      limit: 10000,
      mimetype: 'image/svg+xml'
    }
  }
]
