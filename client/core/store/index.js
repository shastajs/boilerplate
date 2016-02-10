import { createStore, createReducer } from 'shasta'
import localReducers from 'reducers/.lookup'
import plugins from '../plugins'
import initialState from './initialState'

const hotReload = (store) => {
  if (!module.hot) return
  module.hot.accept('reducers/.lookup', () =>
    store.replaceReducers([
      createReducer(require('reducers/.lookup'))
    ])
  )
}

export const configureStore = (initialState) => {
  const store = createStore({
    plugins: plugins,
    reducers: [
      createReducer(localReducers)
    ],
    hooks: [ hotReload ],
    initialState: initialState
  })

  return store
}

export default configureStore(initialState)
