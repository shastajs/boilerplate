import React from 'react'
import { Component, PropTypes } from 'shasta'
import classNames from 'classnames'
import './index.sass'

class Todo extends Component {
  static displayName = 'Todo'
  static propTypes = {
    todo: PropTypes.map.isRequired
  }

  static defaultState = {
    editing: false
  }

  handleDestroyClick() {
    this.actions.todomvc.remove(this.props.todo)
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleCheckClick() {
    this.actions.todomvc.toggle(this.props.todo)
  }

  handleKeyDown(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.actions.todomvc.save(this.props.todo.set('text', text))
      this.editComplete()
    }
  }

  handleBlur() {
    this.setState({ editing: false })
  }

  getContent() {
    if (this.state.editing) {
      return (<input
        className="edit"
        defaultValue={this.props.todo.get('text')}
        autoFocus="true"
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown} />)
    }
    return (<div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={this.props.todo.get('completed')}
        onChange={this.handleCheckClick} />
      <label onDoubleClick={this.handleDoubleClick}>
        {this.props.todo.get('text')}
      </label>
      <button onClick={this.handleDestroyClick} className="destroy" />
    </div>)
  }
  render() {
    const className = classNames({
      completed: this.props.todo.get('completed')
    })
    return (<li className={className}>
      {this.getContent()}
    </li>)
  }
}

export default Component.connect(Todo, require('core/actions'))
