import React from 'react'
import { PropTypes } from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class User extends DataComponent {
  static displayName = 'User';
  static propTypes = {
    repos: PropTypes.iterable,
    greyscale: PropTypes.string.isRequired
  };
  static storeProps = {
    user: 'requests.user',
    greyscale: 'user.greyscale'
  };

  fetch() {
    const opt = {
      name: this.props.name
    }
    this.actions.github.getUser({ requestId: 'user', params: opt })
  }
  renderData({ user }) {
    return (<div className="ui card">
      <img
        className="ui image user-image"
        src={user.get('avatar_url')}
        style={this.props.greyscale ? { WebkitFilter: 'grayscale(100%)' } : {}}
        onClick={this.actions.user.toggleGreyscale}
      />
      <div className="ui content">
        <div className="ui header">{user.get('name')}</div>
        <div className="description">{user.get('email')}</div>
        <div className="meta">
          <span className="location">{user.get('location')}</span>
        </div>
      </div>
      <div className="ui extra content">
        <i className="ui icon user"/>
        {user.get('followers')} followers
      </div>
    </div>)
  }
  renderLoader() {
    return <div className="ui header">Loading...</div>
  }
  renderErrors(errors) {
    return (<div className="errors">
      Failed to Load:
      {
        errors.map((err, field) =>
          <div key={field}>{field}: {err.message}</div>
        ).toArray()
      }
    </div>)
  }
}

export default DataComponent.connect(User, require('core/actions'))
