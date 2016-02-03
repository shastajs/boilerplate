import Immutable from 'immutable'

export default Immutable.fromJS({
  ...(window.__INITIAL_STATE__ || {}),
  ...(__INITIAL_STATE__ || {})
})
