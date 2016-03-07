import React from 'react'
import { Link } from 'shasta-router'
import { Component, PropTypes } from 'shasta'
import jif from 'jif'
import Todo from './Todo'
import classNames from 'classnames'
import DocumentMeta from 'react-document-meta'
import './index.sass'

const ascending = (a, b) => a - b
const filters = {
  All: () => true,
  Active: (i) => !i.get('completed'),
  Completed: (i) => i.get('completed')
}

class TodosView extends Component {
  static displayName = 'TodosView'
  static propTypes = {
    params: PropTypes.shape({
      filter: PropTypes.string
    }).isRequired,
    todos: PropTypes.mapOf(PropTypes.map).isRequired,
    toggled: PropTypes.bool.isRequired
  }
  static storeProps = {
    todos: 'todomvc.items',
    toggled: 'todomvc.toggle'
  }

  addTodo(e) {
    const el = this._input

    if (e.keyCode === 13) {
      let val = el.value.trim()
      if (val === '') {
        return this.setState({ addError: true })
      }

      this.actions.todomvc.create(val)
      el.value = ''
      el.focus()
      this.setState({ addError: false })
    }
  }

  resetErrors() {
    this.setState({ addError: false })
  }

  render() {
    const filterFn = filters[this.props.params.filter || 'All']
    return (
      <div className="todoapp">
        <DocumentMeta title="TodoMVC"/>
        <header className="header">
          <h1>todos</h1>
          <input
            className={
              classNames('new-todo', {
                'input-error': this.state.addError
              })
            }
            ref={(e) => this._input = e}
            onKeyDown={this.addTodo}
            onBlur={this.resetErrors}
            type="text"
            placeholder="What needs to be done?" />
        </header>
        <section className="main">
          {
            jif(this.props.todos.size, () =>
              <input
                className="toggle-all"
                type="checkbox"
                onChange={this.actions.todomvc.toggleAll} />
            )
          }
          <ul className="todo-list">
            {
              this.props.todos
                .filter(filterFn)
                .sort(i => i.get('created'), ascending)
                .map((todo, id) =>
                  <Todo todo={todo} key={id} />
                ).toArray()
            }
          </ul>
        </section>
        {
          jif(this.props.todos.size, () =>
            <footer className="footer">
              <span className="todo-count">
                {this.props.todos.filter(filters.Active).size} items left
              </span>
              <ul className="filters">
              {
                Object.keys(filters).map((k) =>
                  <li key={k}>
                    <Link
                      to={`/todos/${k}`}
                      className={
                        classNames({
                          selected: this.props.params.filter === k
                        })
                      }>{k}</Link>
                  </li>
                )
              }
              </ul>
              {
                jif(this.props.todos.filter(filters.Completed).size, () =>
                  <button
                    onClick={() => this.actions.todomvc.clearCompleted()}
                    className="clear-completed">
                    Clear completed
                  </button>
                )
              }
            </footer>
          )
        }
      </div>
    )
  }

}

export default Component.connect(TodosView, require('core/actions'))
