import { actions as routeActions } from 'shasta-router'
import { createActions, createReducerActions } from 'shasta'
import createAPIActions from 'redux-sutro'
import store from 'core/store'
import localActions from 'actions/.lookup'
import localReducers from 'reducers/.lookup'

export default createActions({
  ...localActions,
  ...routeActions,
  ...createReducerActions(localReducers),
  api: createAPIActions(store.getState().get('resources'))
}, store.dispatch)
