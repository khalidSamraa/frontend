import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  callback: PropTypes.func,
  extra: PropTypes.any,

  disabled: PropTypes.bool,
  className: PropTypes.string
}

const defaultProps = {
  icon: "",
  onClick() {},
  extra: "",

  disabled: false,
  className: ""
}

class OptionItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    const {text, onClick, callback, extra, disabled } = this.props
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      onClick(callback, text, extra)
    }
  }

  render() {
    const {text, icon, onClick, callback, className, extra, disabled} = this.props
    
    if(typeof text === "undefined") {return null}

    return (
      <a tabIndex="0" role="button" className={ classnames(className, {"disabled": disabled}) } onClick={ this.onClick }>
        { icon.trim() && 
            <i className="material-icons">{ icon.trim() }</i>
        }
        { text.trim() }
      </a>
    )
  }
}

OptionItem.propTypes = propTypes
OptionItem.defaultProps = defaultProps
export default OptionItem