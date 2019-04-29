import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  defaultName: PropTypes.any
}

const defaultProps = {
  defaultName: "-"
}

class Avatar extends Component {
  render() {
    const {name, defaultName} = this.props
    return (
      <div className="member-avatar uppercase">{ name.length > 0 ? name[0] : defaultName }</div>
    );
  }
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps
export default Avatar