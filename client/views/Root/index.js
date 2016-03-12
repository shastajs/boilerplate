/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Provider, Component, PropTypes } from 'shasta'
import { Route, IndexRoute, Router } from 'shasta-router'
import { Flex } from 'reflexbox'

import actions from 'core/actions'
import HomeView from 'views/Home'
import AboutView from 'views/About'
import NotFoundView from 'views/NotFound'
import './index.sass'

export default class RootView extends Component {
  static displayName = 'RootView'
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    console.log('Actions:', actions)
  }

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Flex auto>
          <Router history={history}>
            <Route path="/">
              <IndexRoute component={HomeView} />
              <Route path="/about" component={AboutView} />
              <Route path="*" component={NotFoundView} />
            </Route>
          </Router>
        </Flex>
      </Provider>
    )
  }
}
