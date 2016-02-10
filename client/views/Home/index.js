import React from 'react'
import { Link } from 'shasta-router'
import { Component, PropTypes } from 'shasta'
import jif from 'jif'
import DocumentMeta from 'react-document-meta'
import UserList from './UserList'
import RepoList from './RepoList'
import OrgList from './OrgList'
import User from './User'
import './index.sass'

class HomeView extends Component {
  static displayName = 'HomeView';
  static propTypes = {
    count: PropTypes.number.isRequired,
    me: PropTypes.map.isRequired,
    name: PropTypes.string.isRequired
  };
  static defaultProps = {
    name: 'tj'
  };
  static storeProps = {
    count: 'counter.count',
    me: 'me'
  };

  render() {
    return (
      <div className="ui grid relaxed home-view centered">
        <DocumentMeta title="Home" />
        <div className="ui menu top attached">
          <div className="ui item right">
            {
              jif(this.props.me.isEmpty()
              , () =>
                <a className="ui button primary" href="/auth/facebook/start">
                  Sign In
                </a>
              , () =>
                <a className="ui button" href="/auth/logout">
                  Sign out
                </a>
              )
            }
          </div>
        </div>
        <div className="ui row">
          <div className="ui column center aligned">
            <i className="ui icon trophy huge" />
            <div className="ui header">Stack Test Page</div>
            <div className="ui header counter">{this.props.count}</div>
            <div className="ui large buttons">
              <div className="ui button medium positive" onClick={() => this.actions.counter.increment()}>
                Increment
              </div>
              <div className="or"/>
              <div className="ui button medium negative" onClick={() => this.actions.counter.decrement()}>
                Decrement
              </div>
            </div>
          </div>
        </div>
        <div className="github-data ui container">
          <div className="ui grid relaxed centered">
            <div className="ui row">
              <User name={this.props.name}/>
            </div>
            <div className="ui row equal width">
              <OrgList name={this.props.name}/>
              <RepoList name={this.props.name}/>
              <UserList/>
            </div>
          </div>
        </div>
        <div className="ui row">
          <Link to="/about">Go To About View</Link>
        </div>
      </div>
    )
  }
}

export default Component.connect(HomeView, require('core/actions'))
