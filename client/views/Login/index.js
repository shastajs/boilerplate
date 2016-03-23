import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Button, Input, Space } from 'rebass'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'

class LoginView extends Component {
  static displayName = 'LoginView'
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
              type="text"
              rounded />
            <Input
              label="Password"
              name="password"
              type="password"
              rounded />
            <Button theme="info">
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
