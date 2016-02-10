import React from 'react'
import { PropTypes, Component } from 'shasta'
import classNames from 'classnames'
import './index.sass'

export class Title extends Component {
  static displayName = 'Title';
  static propTypes = {
    className: PropTypes.string
  };
  render() {
    return (<div
      {...this.props}
      className={
        classNames('title-component', this.props.className)
      } />)
  }
}

export default Component.connect(Title, require('core/actions'))
