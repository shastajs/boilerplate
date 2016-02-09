import { createReducer } from 'shasta'
import { reducers as routeReducers } from 'shasta-router'
import { reducers as apiReducers } from 'tahoe'
import { reducers as formReducers } from 'shasta-forms'
// import { reducer as storageReducer } from './store/storageEngine'
import localReducers from 'reducers/.lookup'

export default [
  createReducer(localReducers),
  apiReducers,
  routeReducers,
  formReducers
]
