import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Button, Input, Space, Text } from 'rebass'
import { Link } from 'shasta-router'
import { Component, PropTypes, connect } from 'shasta'
import DocumentMeta from 'react-document-meta'
import jif from 'jif'
import Title from 'components/Title'
import actions from 'core/actions'

@connect({
  loginRedirect: 'api.subsets.loginRedirect'
})
export default class LoginView extends Component {
  static displayName = 'LoginView'
  static propTypes = {
    loginRedirect: PropTypes.map
  }
  static defaultState = {
    email: '',
    password: ''
  }
  handleLogin() {
    if (!this.state.email) return
    if (!this.state.password) return
    actions.login({
      subset: 'loginRedirect',
      query: {
        redirectTo: null // TODO
      },
      body: {
        username: this.state.email,
        password: this.state.password
      },
      onResponse: ({ body: { redirectTo, me } }) => {
        actions.me.set(me)
        actions.router.replace(redirectTo)
      }
    })
  }
  render() {
    const { loginRedirect } = this.props
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
              onChange={(e) =>
                this.setState({ email: e.target.value })
              }
              value={this.state.email}
              required />
            <Input
              label="Password"
              name="password"
              type="password"
              onChange={(e) =>
                this.setState({ password: e.target.value })
              }
              value={this.state.password}
              required />
            <Button theme="info" onClick={this.handleLogin}>
              Login
            </Button>
            {
              jif(loginRedirect && loginRedirect.has('error'), () =>
                <Text color="red">
                  Invalid username or password!
                </Text>
              )
            }
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
          <Space />
          <Button
            theme="info"
            href="/auth/github/start">
            Github
          </Button>
        </Box>
        <Box p={1}>
          <Link to="/">Back To Home</Link>
        </Box>
      </Flex>
    )
  }
}
