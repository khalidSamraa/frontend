import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import OptionItem from './OptionItem.js'

const propTypes = {
  items     : PropTypes.array,
  data      : PropTypes.object,
  className : PropTypes.string,
  iconClassName: PropTypes.string,
}

const defaultProps = {
  items     : [],
  data      : {},
  className : "",
  iconClassName: "",
}

class Options extends Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this)
    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)

    this.state = {
      expand: false
    }
  }

  generateItems() {
    const {items} = this.props
    return items.map((value, index) => {
      let itemProps = {}
      itemProps['text'] = value.text
      itemProps['icon'] = value.icon
      itemProps['callback'] = value.onClick
      itemProps['className'] = value.className
      itemProps['extra'] = value.extra
      itemProps['disabled'] = value.disabled
      // if (value.icon) {
      //   itemProps['icon'] = value.icon
      // }
      // if (value.onClick) {
      //   itemProps['callback'] = value.onClick
      // } else {
      //   itemProps['callback'] = ()=>{}
      // }

      return (
        <OptionItem
          {...itemProps}
          onClick={this.onItemClick}
          key={index}
        />
      )
    })
  }

  expand(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({expand: true})
  }

  collapse(e) {
    // this.setState({expand: false})
    e.preventDefault()
    e.stopPropagation()
    this.timer = setTimeout(() => {
      this.setState({expand: false});
    }, 200)
  }

  onItemClick(callback, text, extra) {
    const {data} = this.props
    callback(data, text, extra)
  }

  render() {
    let {expand} = this.state
    let {className, iconClassName} = this.props

    return (
      <div onBlur={ this.collapse } tabIndex="0" className={ classnames('dropdown member-menu', className, {'dropdown-active': expand}) }>
        <button onClick={ this.expand } className="dropbtn"><i className={classnames(iconClassName, "material-icons")}>more_horiz</i></button>
        <div className='dropdown-content'>
          <span className="caret-black"></span>
          { this.generateItems() }
        </div>
      </div>
    )
  }
}

Options.propTypes = propTypes
Options.defaultProps = defaultProps
export default Options
