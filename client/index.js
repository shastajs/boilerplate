import DOM from 'react-dom'
import { history } from 'shasta-router'
import React from 'react'
import store from 'core/store'
import routes from 'routes'
import Root from 'views/Root'

const rootNode = <Root history={history} store={store} routes={routes} />
DOM.render(rootNode, document.getElementById('root'))
