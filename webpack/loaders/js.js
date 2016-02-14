export default [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: [ 'transform-runtime', 'add-module-exports' ],
      presets: [ 'es2015', 'react', 'stage-0' ],
      env: {
        development: {
          plugins: [
            [ 'react-transform', {
              // omit HMR plugin by default and _only_ load in hot mode
              transforms: [ {
                transform: 'react-transform-catch-errors',
                imports: [ 'react', 'redbox-react' ]
              } ]
            } ]
          ]
        }
      }
    }
  }
]
