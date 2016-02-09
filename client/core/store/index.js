import { createStore, createReducer } from 'shasta'
import localReducers from 'reducers/.lookup'
import plugins from '../plugins'
import initialState from './initialState'

const hotReload = (store) => {
  if (!module.hot) return store
  const reducersPath = 'reducers/.lookup'
  module.hot.accept(reducersPath, () =>
    store.replaceReducers([
      createReducer(require(reducersPath))
    ])
  )
  return store
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
