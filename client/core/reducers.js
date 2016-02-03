import { combineReducers } from 'shasta'
import { reducer as routeReducer } from 'shasta-router'
import { reducers as apiReducers } from 'tahoe'
import { reducer as formReducer } from 'shasta-forms'
import { toReducers } from 'modules-to-redux'
import localReducers from 'reducers/.lookup'

export const reducers = {
  ...apiReducers,
  ...toReducers(localReducers),
  router: routeReducer,
  forms: formReducer
}

export default combineReducers(reducers)
