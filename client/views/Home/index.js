import React from 'react'
import { Link } from 'shasta-router'
import { Component, PropTypes, connect } from 'shasta'
import { Flex, Box } from 'reflexbox'
import {
  Toolbar, NavItem, Space,
  Text, Container, Button,
  Panel, PanelHeader, PanelFooter
} from 'rebass'
import jif from 'jif'
import actions from 'core/actions'
import DocumentMeta from 'react-document-meta'
import UserList from './UserList'
import RepoList from './RepoList'
import OrgList from './OrgList'
import User from './User'

@connect({
  count: 'counter.count',
  me: 'me'
})
export default class HomeView extends Component {
  static displayName = 'HomeView'
  static propTypes = {
    count: PropTypes.number.isRequired,
    me: PropTypes.map.isRequired,
    name: PropTypes.string.isRequired
  }
  static defaultProps = {
    name: 'tj'
  }

  render() {
    return (
      <Flex align="center" column auto>
        <DocumentMeta title="Home" />
        <Box col={12}>
          <Toolbar>
            <Space auto />
            {
              jif(this.props.me.isEmpty()
              , () =>
                <NavItem is={Link} to="/login">
                  Sign In
                </NavItem>
              , () =>
                <NavItem href="/auth/logout">
                  Sign out
                </NavItem>
              )
            }
          </Toolbar>
        </Box>

        <Box p={2} sm={12} md={6} lg={4}>
          <Panel rounded>
            <PanelHeader>Counter</PanelHeader>
            <Container>
              <Text>Current: {this.props.count}</Text>
            </Container>
            <PanelFooter>
              <Flex justify="space-between" auto wrap>
                <Button onClick={() => actions.counter.increment()}>
                  Increment
                </Button>
                <Button onClick={() => actions.counter.decrement()}>
                  Decrement
                </Button>
                <Button onClick={() => actions.counter.reset()}>
                  Reset
                </Button>
              </Flex>
            </PanelFooter>
          </Panel>
        </Box>

        <Box p={2} sm={12} md={6} lg={4}>
          <User name={this.props.name} />
        </Box>

        <Flex align="flex-start" auto>
          <Box p={2} sm={12} md={4} lg={4}>
            <OrgList name={this.props.name}/>
          </Box>

          <Box p={2} sm={12} md={4} lg={4}>
            <RepoList name={this.props.name}/>
          </Box>

          <Box p={2} sm={12} md={4} lg={4}>
            <UserList/>
          </Box>
        </Flex>

        <Flex align="center" auto>
          <Link to="/about">Go To About View</Link>
        </Flex>
      </Flex>
    )
  }
}
