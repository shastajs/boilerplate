import { createStore, createReducer } from 'shasta'
import localReducers from 'reducers/.lookup'
import plugins from '../plugins'
import initialState from './initialState'

export default createStore({
  plugins: plugins,
  reducers: [
    createReducer(localReducers)
  ],
  initialState: initialState
})
