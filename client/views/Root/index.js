/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Provider, Component, PropTypes } from 'shasta'
import { Route, IndexRoute, Router } from 'shasta-router'

import HomeView from 'views/Home'
import AboutView from 'views/About'
import TodosView from 'views/Todos'
import NotFoundView from 'views/NotFound'

// any global stuff
import fixHash from 'remove-fb-hash'
import 'semantic-ui-css/semantic.css'
import './index.sass'
fixHash()

class RootView extends Component {
  static displayName = 'RootView';
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    console.log('Actions:', this.actions)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="root-view">
          <Router history={this.props.history}>
            <Route path="/">
              <IndexRoute component={HomeView} />
              <Route path="/about" component={AboutView} />
              <Route path="/todos" component={TodosView} />
              <Route path="/todos/:filter" component={TodosView} />
              <Route path="*" component={NotFoundView}/>
            </Route>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default Component.connect(RootView, require('core/actions'))
