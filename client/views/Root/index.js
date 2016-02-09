import { Provider } from 'shasta'
import { Router } from 'shasta-router'
import React from 'react'
import {Component, PropTypes} from 'shasta'

import 'semantic-ui-css/semantic.css'
import './index.sass'

class RootView extends Component {
  static displayName = 'RootView';
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  componentDidMount () {
    console.log('Actions:', this.actions)
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div className='root-view'>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Component.connect(RootView, require('core/actions'))
