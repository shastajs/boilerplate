import { createStore, combineReducers } from 'shasta'
import { hook as routerHook } from 'shasta-router'
// import { hook as storageHook } from './storageEngine'
import reducers from '../reducers'
import middleware from './middleware'
import initialState from './initialState'

const hotReload = (store) => {
  if (!module.hot) return store
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers'))
  )
  return store
}

export const configureStore = (initialState) => {
  const store = createStore({
    middleware: middleware,
    reducer: combineReducers(...reducers),
    initialState: initialState
  })

  // storageHook(store)
  routerHook(store)
  hotReload(store)

  return store
}

export default configureStore(initialState)
