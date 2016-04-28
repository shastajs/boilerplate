/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Provider, Component, PropTypes } from 'shasta'
import { Router } from 'shasta-router'

// styling globals
import 'styles/global'
import rebassStyles from 'styles/rebass'
import reflexboxStyles from 'styles/reflexbox'

export default class RootView extends Component {
  static displayName = 'RootView'
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    routes: PropTypes.node.isRequired
  }
  static childContextTypes = {
    rebass: PropTypes.object,
    reflexbox: React.PropTypes.object
  }
  getChildContext() {
    return {
      rebass: rebassStyles,
      reflexbox: reflexboxStyles
    }
  }

  componentWillMount() {
    console.time('First Render Time')
  }
  componentDidMount() {
    console.timeEnd('First Render Time')
  }
  render() {
    const { store, history, routes } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    )
  }
}
