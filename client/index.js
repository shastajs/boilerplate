import fixHash from 'remove-fb-hash'
import DOM from 'react-dom'
import { history } from 'shasta-router'
import React from 'react'
import routes from 'routes'
import store from 'core/store'
import Root from 'views/Root'

fixHash()
DOM.render(
  <Root
    history={history}
    routes={routes}
    store={store} />,
  document.getElementById('root')
)
