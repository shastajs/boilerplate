import React from 'react'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'
import './index.sass'

class AboutView extends Component {
  static displayName = 'AboutView';
  render() {
    return (
      <div className="ui grid about-view middle aligned one column centered">
        <DocumentMeta title="About"/>
        <div className="ui row">
          <div className="ui column eight wide middle aligned">
            <Title className="large">About View</Title>
            <Link to="/">Back To Home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Component.connect(AboutView, require('core/actions'))
