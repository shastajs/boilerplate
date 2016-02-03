import Immutable from 'immutable'
import uuid from 'uuid'

const initialState = Immutable.fromJS({
  toggle: false,
  items: {}
})

export const create = (state, {payload}) => {
  let id = uuid.v1()
  let todo = Immutable.Map({
    id: id,
    text: payload,
    created: Date.now(),
    completed: false
  })
  return state.setIn(['items', id], todo)
}

export const remove = (state, {payload}) =>
  state.deleteIn(['items', payload.get('id')])

export const toggle = (state, {payload}) =>
  state.updateIn(['items', payload.get('id'), 'completed'], v => !v)

export const toggleAll = (state, {payload}) =>
  state.withMutations((s) =>
    s.update('items', v =>
      v.map(i => i.set('completed', !s.get('toggle')))
    ).update('toggle', v => !v)
  )

export const save = (state, {payload}) =>
  state.setIn(['items', payload.get('id'), 'text'], payload.get('text'))

export const clearCompleted = (state, {payload}) =>
  state.update('items', v =>
    v.filter(i => !i.get('completed'))
  )

export default initialState
