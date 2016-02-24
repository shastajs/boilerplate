import { Map } from 'immutable'

export const initialState = Map({ count: 1 })

export const increment = (state, { payload = 1 }) =>
  state.update('count', v => v + payload)
export const decrement = (state, { payload = 1 }) =>
  state.update('count', v => v - payload)
export const reset = () => initialState
