import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage'

const whitelist = [
  'counter',
  'collections',
  'requests',
  'todomvc',
  'people'
]

const actionBlacklist = [
  '@@router/INIT_PATH'
]

const engine = createEngine('x')

const storageEngine =
  storage.decorators.filter(
    storage.decorators.debounce(
      storage.decorators.immutablejs(engine, whitelist)
    , 100)
  , whitelist)

export default {
  engine: storageEngine,
  load: storage.createLoader(storageEngine),
  reducer: storage.reducer,
  middleware: storage.createMiddleware(storageEngine, actionBlacklist)
}
