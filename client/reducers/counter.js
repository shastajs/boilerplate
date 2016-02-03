const initialState = 1

export const increment = (state, { payload = 1 }) => state + payload
export const decrement = (state, { payload = 1 }) => state - payload

export default initialState
