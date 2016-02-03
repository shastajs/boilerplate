import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, Field } from 'shasta-forms'

// PersonForm
// example shasta-forms usage

class PersonForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    params: PropTypes.object,
    people: PropTypes.map.isRequired
  };
  static storeProps = {
    people: 'people'
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  getModel (cursor, idName = 'id') {
    if (this.props.params) {
      return this.props[cursor].get(this.props.params[idName])
    }
  }
  handleSubmit (data) {
    // get user id from url
    let id = this.id || 'id'
    data.id = this.props.params[id]
    this.actions.people.save(data)
    this.context.router.replace('/crm')
  }
  render () {
    let model = this.getModel('people')
    let title = 'New Person'
    let initialValues = {}
    if (model) {
      initialValues = model.toJS()
      title = model.get('name')
    }
    return (
      <div>
        <h3>{title}</h3>
        <Form
          name='person'
          className='ui form'
          onFormSubmit={this.handleSubmit}
          initialValues={initialValues}>
          {/* simply define a Field, with options like required */}
          <Field
            name='name'
            required />
          <Field name='location' required placeholder='San Francisco, CA' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' placeholder='//me.com/smallImage.png' noLabel />
            <Field name='largeImage' placeholder='//me.com/largeImage.png' noLabel />
          </div>
          <div className='six wide field'>
            {/* type='email' gives you email validation */}
            <Field name='email' type='email' />
            <Field name='twitter' />
            <Field name='facebook' />
            <Field name='instagram' />
          </div>
          <button type='submit' className='ui button'>Submit</button>
        </Form>
      </div>
    )
  }
}

// connect the Component
export default Component.connect(PersonForm, require('core/actions'))
