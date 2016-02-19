import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage'

export const createPlugin = (opt = {}) => {
  const whitelist = [ ...opt.whitelist ]
  const actionBlacklist = [ ...opt.blacklist ]
  const engine = createEngine(opt.key)

  const storageEngine =
    storage.decorators.filter(
      storage.decorators.debounce(
        storage.decorators.immutablejs(engine, whitelist)
      , 100)
    , whitelist)

  return {
    engine: storageEngine,
    hook: (store) => {
      const loader = storage.createLoader(storageEngine)
      loader(store)
      return store
    },
    reducer: storage.reducer,
    middleware: storage.createMiddleware(storageEngine, actionBlacklist)
  }
}

export default createPlugin({
  key: 'x',
  whitelist: [
    'counter',
    'collections',
    'requests',
    'todomvc',
    'people'
  ],
  blacklist: [
    '@@router/INIT_PATH',
    '@@router/UPDATE_LOCATION'
  ]
})
