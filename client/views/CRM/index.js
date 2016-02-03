import React from 'react'
import {PropTypes as proptypes} from 'react'
import {Component, PropTypes} from 'shasta'
import { Link } from 'shasta-router'
import {Button} from 'react-semantify'
import './index.sass'
import DocumentMeta from 'react-document-meta'

export class CRMView extends Component {
  static propTypes = {
    people: PropTypes.map.isRequired,
    children: proptypes.object
  };
  static defaultState = {
    name: 'funkytek'
  };
  static storeProps = {
    people: 'people'
  };

  filterPeople (e) {
    this.actions.filterPeople(e.target.value)
  }

  render () {
    return (
      <div className='crm'>
        <DocumentMeta title='CRM'/>
        <div className='navbar'>
          <Link to='/crm'>🔥</Link>
        </div>
        <div className='main'>
          {/* People */}
          <div className='people'>
            {this.props.children}
          </div>
          {/* Messages */}
          <div className='messages'>
            <h3>Message</h3>
            <div className='ui form'>
              <div className='field'>
                <textarea></textarea>
              </div>
              <Button>Send</Button>
            </div>
          </div>

          {/* Drop */}
          <div className='drop'>
            <h3>Content</h3>
            <div className=''>
              <iframe width='100%' height='215' src='https://www.youtube.com/embed/AgbpWQCOm6I' frameBorder='0' allowFullScreen></iframe>
              <iframe width='100%' height='215' src='https://www.youtube.com/embed/2Sut_KgDTHg' frameBorder='0' allowFullScreen></iframe>
              <iframe width='100%' height='250' scrolling='no' frameBorder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/235150744&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Component.connect(CRMView, require('core/actions'))
