import csjs from 'csjs-inject'
import React from 'react'
import { PropTypes, Component } from 'shasta'
import classNames from 'classnames'

const style = csjs`
  .title {
    font-size: responsive 1.25rem 1.5rem;
    line-height: 2rem;
    font-weight: bold;
  }
`

export class Title extends Component {
  static displayName = 'Title'
  static propTypes = {
    className: PropTypes.string
  }
  render() {
    const ourClass = classNames(style.title, this.props.className)
    return <div {...this.props} className={ourClass} />
  }
}

export default Title
