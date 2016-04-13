import { createAction } from 'tahoe'

export default createAction({
  endpoint: '/auth/local/start',
  method: 'POST'
})
