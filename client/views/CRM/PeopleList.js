import React from 'react'
import { Link } from 'shasta-router'
import {Component, PropTypes} from 'shasta'
import {Button, Icon} from 'react-semantify'
import './index.sass'

class PeopleList extends Component {
  static propTypes = {
    people: PropTypes.map.isRequired
  };
  static storeProps = {
    people: 'people'
  };

  filterPeople (e) {
    this.actions.people.filter(e.target.value)
  }

  render () {
    return (

      <div>

        {/* Nav */}
        <div className='nav'>

          <div className='ui search'>
            <div className='ui icon input'>
              <input
                className='prompt'
                placeholder='Search People'
                onKeyDown={this.filterPeople}
                type = 'text' />
            </div>
            <div className='results'></div>
          </div>

          <Button className='icon filterUsers'><Icon className='filter' /></Button>
          <Link to='/crm/create'>
            <Button className='icon'><Icon className='add' /></Button>
          </Link>
        </div>

        {/* List */}
        <div className='ui middle aligned divided list'>
          {
            this.props.people.map((person, id) =>
              <Link to={`/crm/person/${person.get('id')}`} className='item' key={id}>
                <img className='ui avatar image' src={person.get('smallImage')} />
                <div className='content'>
                  <div className='header'>{person.get('name')}</div>
                </div>
                <div className='right floated badges middle aligned'>
                  $$
                </div>
              </Link>
            ).toArray()
          }
        </div>
      </div>
    )
  }
}

export default Component.connect(PeopleList, require('core/actions'))
