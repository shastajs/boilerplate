import { Map } from 'immutable'

export const initialState = Map()

export const add = (state, { payload }) => state.merge(payload)
