import React from 'react'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import { Flex, Box } from 'reflexbox'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'

export default class NotFoundView extends Component {
  static displayName = 'NotFoundView'
  render() {
    return (
      <Flex align="center" justify="center" column auto>
        <DocumentMeta title="About"/>
        <Box p={1}>
          <Title className="large">Not Found!</Title>
        </Box>
        <Box p={1}>
          <Link to="/">Back To Home</Link>
        </Box>
      </Flex>
    )
  }
}
