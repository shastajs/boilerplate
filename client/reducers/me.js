import { Map } from 'immutable'

export const initialState = Map()

export const update = (state, { payload }) => state.merge(payload)
