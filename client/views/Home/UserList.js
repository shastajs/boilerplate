import React from 'react'
import { PropTypes, connect } from 'shasta'
import DataComponent from 'shasta-data-view'
import actions from 'core/actions'
import {
  Media, Heading, Text,
  Panel, PanelHeader
} from 'rebass'

@connect({
  users: 'api.subsets.users'
})
export default class UserList extends DataComponent {
  static displayName = 'UserList'
  static propTypes = {
    users: PropTypes.list
  }

  resolveData() {
    actions.api.users.find({ subset: 'users', tail: true })
  }

  handleUserClick(user) {
    actions.api.users.updateById({
      params: {
        id: user.get('id')
      },
      body: {
        count: user.get('count') + 1
      }
    })
  }

  renderData({ users }) {
    return (<Panel rounded>
      <PanelHeader>DB Users</PanelHeader>
      {
        users.map(user =>
          <Media
            key={user.get('id')}
            align="center"
            img={user.get('image')}
            style={{
              WebkitUserSelect: 'none',
              cursor: 'pointer'
            }}
            onClick={() => this.handleUserClick(user)}>
              <Heading level={3}>{user.get('name')}</Heading>
              <Text>Clicks: {user.get('count')}</Text>
          </Media>
        )
      }
    </Panel>)
  }
  renderErrors(errors) {
    return (<Panel rounded>
      <PanelHeader>DB Users</PanelHeader>
      <Heading>Failed to Load!</Heading>
      {
        errors.map((err, field) =>
          <Media key={field} align="center">
            <Heading level={3}>{field}</Heading>
            <Text>{err.message}</Text>
          </Media>
        ).toArray()
      }
    </Panel>)
  }
}
