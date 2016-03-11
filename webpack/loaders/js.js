import { babel } from '../../package'

export default [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: babel.plugins,
      presets: babel.presets,
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
