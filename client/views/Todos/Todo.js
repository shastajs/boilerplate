import React from 'react'
import {Component, PropTypes} from 'shasta'
import classNames from 'classnames'
import './index.sass'

class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  static defaultState = {
    editing: false
  };

  destroy () {
    this.actions.todomvc.remove(this.props.todo)
  }

  handleDoubleClick () {
    this.setState({editing: true})
  }

  toggle () {
    this.actions.todomvc.toggle(this.props.todo)
  }

  saveTodo (e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.actions.todomvc.save(this.props.todo.set('text', text))
      this.editComplete()
    }
  }

  editComplete () {
    this.setState({editing: false})
  }

  getContent () {
    if (this.state.editing) {
      return <input
        ref='todo'
        className='edit'
        defaultValue={this.props.todo.get('text')}
        autoFocus='true'
        onBlur={this.editComplete}
        onKeyDown={this.saveTodo} />
    }
    return <div className='view'>
      <input
        className='toggle'
        type='checkbox'
        checked={this.props.todo.get('completed')}
        onChange={this.toggle} />
      <label onDoubleClick={this.handleDoubleClick}>
        {this.props.todo.get('text')}
      </label>
      <button onClick={this.destroy} className='destroy' />
    </div>
  }
  render () {
    var className = classNames({
      completed: this.props.todo.get('completed')
    })
    return <li className={className}>
      {this.getContent()}
    </li>
  }
}

export default Component.connect(Todo, require('core/actions'))
