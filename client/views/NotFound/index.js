import React from 'react'
import { Link } from 'shasta-router'
import { Component } from 'shasta'
import DocumentMeta from 'react-document-meta'
import Title from 'components/Title'
import './index.sass'

class NotFoundView extends Component {
  static displayName = 'NotFoundView';
  render() {
    return (
      <div className="ui grid not-found-view middle aligned one column centered">
        <DocumentMeta title="Not Found" />
        <div className="ui row">
          <div className="ui column eight wide middle aligned">
            <Title>The page you requested does not exist!</Title>
            <Link to="/">Back To Home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Component.connect(NotFoundView, require('core/actions'))
