import { createReducer, combineReducers } from 'shasta'
import { reducer as routeReducer } from 'shasta-router'
import { reducers as apiReducers } from 'tahoe'
import { reducer as formReducer } from 'shasta-forms'
import { reducer as storageReducer } from './store/storageEngine'
import localReducers from 'reducers/.lookup'

const appReducer = createReducer(localReducers)
const otherReducers = {
  router: routeReducer,
  forms: formReducer,
  ...apiReducers
}

export default storageReducer(combineReducers(
  appReducer,
  otherReducers
))
