import { Map, fromJS } from 'immutable'

export const initialState = Map()

export const set = (state, { payload }) => fromJS(payload)
