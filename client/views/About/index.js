import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'

class AboutView extends Component {
  static displayName = 'AboutView'
  render() {
    return (
      <Flex align="center" justify="center" column auto>
        <DocumentMeta title="About"/>
        <Box p={1}>
          <Title className="large">About View</Title>
        </Box>
        <Box p={1}>
          <Link to="/">Back To Home</Link>
        </Box>
      </Flex>
    )
  }
}

export default Component.connect(AboutView, require('core/actions'))
