import React from 'react'
import { Link } from 'shasta-router'
import {Component, PropTypes} from 'shasta'
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
    counter: PropTypes.number,
    me: PropTypes.map
  };
  static defaultState = {
    name: 'tj'
  };
  static storeProps = {
    counter: 'counter',
    me: 'me'
  };
  render () {
    return (
      <div className='ui grid relaxed home-view centered'>
        <DocumentMeta title='Home' />
        <div className='ui menu top attached'>
          <div className='ui item left aligned category search'>
            <div className='ui transparent icon input'>
              <input className='prompt' type='text' placeholder='Search animals...'/>
              <i className='ui icon search link'/>
            </div>
          </div>
          <div className='ui item right'>
            {
              jif(!this.props.me, () =>
                <a className='ui button primary' href='/auth/facebook/start'>
                  Sign In
                </a>
              )
            }
            {
              jif(this.props.me, () =>
                <a className='ui button' href='/auth/logout'>
                  Sign out
                </a>
              )
            }
          </div>
        </div>
        <div className='ui row'>
          <div className='ui column center aligned'>
            <i className='ui icon trophy huge' />
            <div className='ui header'>Stack Test Page</div>
            <div className='ui header counter'>{this.props.counter}</div>
            <div className='ui large buttons'>
              <div className='ui button medium positive' onClick={() => this.actions.counter.increment()}>
                Increment
              </div>
              <div className='or'/>
              <div className='ui button medium negative' onClick={() => this.actions.counter.decrement()}>
                Decrement
              </div>
            </div>
          </div>
        </div>
        <div className='ui row'>
          <div className='github-data ui container'>
            <div className='ui grid relaxed centered'>
              <div className='ui row'>
                <User name={this.state.name}/>
              </div>
              <div className='ui row equal width'>
                <OrgList name={this.state.name}/>
                <RepoList name={this.state.name}/>
                <UserList/>
              </div>
            </div>
          </div>
        </div>
        <div className='ui row'>
          <Link to='/about'>Go To About View</Link>
        </div>
      </div>
    )
  }
}

export default Component.connect(HomeView, require('core/actions'))
