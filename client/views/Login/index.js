import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Button, Input, Space } from 'rebass'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import linkState from 'react-link-state'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'
import actions from 'core/actions'

class LoginView extends Component {
  static displayName = 'LoginView'
  static defaultState = {
    email: null,
    password: null
  }
  handleLogin() {
    if (!this.state.email) return
    if (!this.state.password) return
    actions.login({
      body: {
        username: this.state.email,
        password: this.state.password
      }
    })
  }
  render() {
    return (
      <Flex align="center" justify="center" column auto>
        <DocumentMeta title="Login"/>
        <Box p={1}>
          <Title className="large">Login</Title>
        </Box>
        <Box p={1}>
          <Flex align="center" justify="center" column auto>
            <Input
              label="Email"
              name="email"
              placeholder="example@city.gov"
              type="email"
              valueLink={linkState(this, 'email')}
              required />
            <Input
              label="Password"
              name="password"
              type="password"
              valueLink={linkState(this, 'password')}
              required />
            <Button theme="info" onClick={this.handleLogin}>
              Login
            </Button>
          </Flex>
        </Box>
        <Box p={1}>
          <Title className="large">- OR -</Title>
        </Box>
        <Box p={2}>
          <Button
            theme="info"
            href="/auth/facebook/start">
            Facebook
          </Button>
          <Space />
          <Button
            theme="info"
            href="/auth/google/start">
            Google
          </Button>
        </Box>
        <Box p={1}>
          <Link to="/">Back To Home</Link>
        </Box>
      </Flex>
    )
  }
}

export default LoginView
