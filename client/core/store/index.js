import { createStore } from 'shasta'
import { listenForReplays } from 'shasta-router'
import storage from './storageEngine'
import rootReducer from '../reducers'
import middleware from './middleware'
import initialState from './initialState'

const hotReload = (store) => {
  if (!module.hot) return
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers'))
  )
}

export function configureStore (initialState) {
  const store = createStore({
    middleware: middleware,
    reducer: storage.reducer(rootReducer),
    initialState: initialState
  })
  storage.load(store)
  listenForReplays(store)
  hotReload(store)

  return store
}

export default configureStore(initialState)
