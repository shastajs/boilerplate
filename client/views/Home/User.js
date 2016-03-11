import React from 'react'
import { PropTypes, connect } from 'shasta'
import {
  Text, Heading,
  Panel, PanelHeader, Banner, Media
} from 'rebass'
import actions from 'core/actions'
import DataComponent from 'shasta-data-view'

@connect({
  user: 'subsets.user'
})
export default class User extends DataComponent {
  static displayName = 'User'
  static propTypes = {
    name: PropTypes.string.isRequired,
    user: PropTypes.iterable
  }

  resolveData() {
    actions.github.getUser({
      subset: 'user',
      params: {
        name: this.props.name
      }
    })
  }

  renderData({ user }) {
    return (
      <Panel rounded>
        <PanelHeader>User Info</PanelHeader>
        <Banner
          style={{
            maxHeight: 400,
            minHeight: 0
          }}
          mb={0}
          align="center"
          backgroundImage="https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg"
          >
            <Heading level={2}>{user.get('name')}</Heading>
            <Heading level={3}>{user.get('followers')} followers</Heading>
        </Banner>
      </Panel>
    )
  }
  renderErrors(errors) {
    return (<Panel rounded>
      <PanelHeader>User Info</PanelHeader>
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
