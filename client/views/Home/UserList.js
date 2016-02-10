import React from 'react'
import { PropTypes } from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class UserList extends DataComponent {
  static displayName = 'UserList';
  static propTypes = {
    users: PropTypes.iterable
  };
  static storeProps = {
    users: 'requests.users'
  };

  fetch() {
    this.actions.api.users.find({ requestId: 'users' })
    this.actions.api.users.find({ requestId: 'users', tail: true })
  }

  renderData({ users }) {
    return (<div className="ui list relaxed column">
      <div className="ui header">{users.size} Users</div>
      {
        users.map((user) =>
          <div className="ui item" key={user.get('id')}>
            <i className="ui icon large user middle aligned"/>
            <div className="content">
              <div className="ui header">{user.get('name')}</div>
            </div>
          </div>
        )
      }
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

export default DataComponent.connect(UserList, require('core/actions'))
