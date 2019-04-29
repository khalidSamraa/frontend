import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  iid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  
  designType: PropTypes.number,
}

const defaultProps = {
  designType: 1,
}

class Institution extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderSimple(){
    const {name} = this.props
    return (
      <div className="">
        <span className="user-type">Institution</span>
        <div className="user-name full-width book-title">{name}</div>
      </div>
    );
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderSimple()
    }
    return (null)
  }
}

Institution.propTypes = propTypes
Institution.defaultProps = defaultProps
export default Institution