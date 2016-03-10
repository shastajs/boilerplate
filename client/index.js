
import DOM from 'react-dom'
import { history } from 'shasta-router'
import React from 'react'
import store from 'core/store'
import actions from 'core/actions'
import Root from 'views/Root'

DOM.render(<Root history={history} store={store} actions={actions} />, document.getElementById('root'))
