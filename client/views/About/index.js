import { Link } from 'shasta-router'
import {Grid, Header, Row, Column} from 'react-semantify'
import { Component } from 'shasta'
import React from 'react'
import DocumentMeta from 'react-document-meta'
import './index.sass'

class AboutView extends Component {
  static displayName = 'AboutView';
  render () {
    return (
      <Grid className='about-view middle aligned one column centered'>
        <DocumentMeta title='About'/>
        <Row>
          <Column className='eight wide middle aligned'>
            <Header className='large'>About View</Header>
            <Link to='/'>Back To Home</Link>
          </Column>
        </Row>
      </Grid>
    )
  }
}

export default Component.connect(AboutView, require('core/actions'))
