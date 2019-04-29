import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  eid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.number,
  created: PropTypes.string,

  memberCount: PropTypes.number,

  className: PropTypes.string,
  designType: PropTypes.number,
}

const defaultProps = {
  state: -1,
  created: '',

  memberCount: 0,

  className: '',
  designType: 1,
}


class Ensemble extends Component {

  renderTypeOne() {
    const {name, memberCount} = this.props
    return (
      <div className="institution-info">
        <div className="institution-name">
          {name}
        </div>
        <div className="institution-total-member">
          {memberCount} member{(memberCount > 1) ? 's' : null}
        </div>
      </div>
    );
  }

  render() {
    const {designType} = this.props
    if (designType === 1) {
      return this.renderTypeOne()
    }
    return (null)
  }
}

Ensemble.propTypes = propTypes
Ensemble.defaultProps = defaultProps
export default Ensemble
