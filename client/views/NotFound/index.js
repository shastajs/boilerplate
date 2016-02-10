import { Link } from 'shasta-router'
import { Grid, Header, Row, Column } from 'react-semantify'
import { Component } from 'shasta'
import React from 'react'
import DocumentMeta from 'react-document-meta'
import './index.sass'

class NotFoundView extends Component {
  static displayName = 'NotFoundView';
  render() {
    return (
      <Grid className="not-found-view middle aligned one column centered">
        <DocumentMeta title="Not Found" />
        <Row>
          <Column className="eight wide middle aligned">
            <Header className="large">The page you requested does not exist!</Header>
            <Link to="/">Back To Home</Link>
          </Column>
        </Row>
      </Grid>
    )
  }
}

export default Component.connect(NotFoundView, require('core/actions'))
