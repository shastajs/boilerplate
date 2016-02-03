import React from 'react'
import {Component, PropTypes} from 'shasta'
import { Link } from 'shasta-router'
import './index.sass'

class PersonProfile extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  static propTypes = {
    params: PropTypes.object
  };
  static storeProps = {
    people: 'people'
  };
  getModel (cursor, idName = 'id') {
    return this.props[cursor].get(this.props.params[idName])
  }
  componentDidMount () {
    let link = this.refs.link
    let js = document.createElement('script')
    js.id = 'twitter-wjs'
    js.src = '//platform.twitter.com/widgets.js'
    link.parentNode.appendChild(js)
  }
  remove () {
    if (confirm(`Delete user ${this.person.get('name')}?`)) {
      this.actions.people.remove(this.person)
      this.context.router.replace('/crm')
    }
  }
  render () {
    this.person = this.getModel('people')
    return (
      <div className='ui grid'>
        <div className='seven wide column'>
          <div className='ui card'>
            <div className='image'>
              <img src={this.person.get('largeImage')} />
            </div>
            <div className='content'>
              <a className='header'>{this.person.get('name')}</a>
              <div className='meta'>
                <span className='date'>{this.person.get('location')}</span>
              </div>
              <div className='description'>
                Notes about user
              </div>
            </div>
            <div className='extra content'>
              <a>
                $$$
                🔥🔥🔥
              </a>
              <button onClick={this.remove} className='right floated mini ui red button'>Delete</button>
              <Link to={`/crm/edit/${this.person.get('id')}`} className='right floated mini ui primary button'>Edit</Link>
            </div>
          </div>
        </div>
        <div className='nine wide column'>
          <a
            ref='link'
            className='twitter-timeline'
            href={`https://twitter.com/${this.person.get('twitter')}`}
            data-widget-id='691226625745096709'
            data-screen-name={this.person.get('twitter')}
            data-chrome='noheader nofooter' />
        </div>
      </div>
    )
  }
}

export default Component.connect(PersonProfile, require('core/actions'))
