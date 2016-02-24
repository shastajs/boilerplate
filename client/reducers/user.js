import { Map } from 'immutable'

export const initialState = Map({ greyscale: false })

export const toggleGreyscale = (state) =>
  state.update('greyscale', v => !v)
