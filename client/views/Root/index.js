/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Provider, Component, PropTypes } from 'shasta'
import { Route, IndexRoute, Router } from 'shasta-router'
import { Flex } from 'reflexbox'

import HomeView from 'views/Home'
import AboutView from 'views/About'
import NotFoundView from 'views/NotFound'
import './index.sass'

// some global crap
import fixHash from 'remove-fb-hash'
fixHash()

class RootView extends Component {
  static displayName = 'RootView'
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    console.log('Actions:', this.actions)
  }

  render() {
    return (
      <Provider store={this.props.store} actions={this.props.actions}>
        <Flex auto>
          <Router history={this.props.history}>
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

export default Component.connect(RootView, require('core/actions'))
