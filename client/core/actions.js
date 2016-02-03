import { actions as routeActions } from 'shasta-router'
import { createActions } from 'shasta'
import { toActions } from 'modules-to-redux'
import createAPIActions from 'redux-sutro'
import initialState from 'core/store/initialState'
import localActions from 'actions/.lookup'
import localReducers from 'reducers/.lookup'

export default createActions({
  ...localActions,
  ...toActions(localReducers),
  api: createAPIActions(initialState.get('resources')),
  router: routeActions
})
