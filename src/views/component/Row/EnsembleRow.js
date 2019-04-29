import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ensemble from '../Ensemble.js';

const propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  isSwitching: PropTypes.bool.isRequired,
  onSwitch: PropTypes.func,
}

const defaultProps = {
  onSwitch() {},
}

class EnsembleRow extends Component {
  constructor(props) {
    super(props)

    this.onSwitch = this.onSwitch.bind(this)
  }

  onSwitch() {
    const { onSwitch, data, index }  = this.props
    onSwitch({eid: data.eid, index: index})
  }

  render() {
    const { data, isSwitching } = this.props
    return (
      <li className="institution transition-all">
        <Ensemble eid={data.eid} name={data.name} state={data.state} created={data.created} memberCount={data.members.length} />
        <div className="institution-switch">
          <a tabIndex="0" role="button" onClick={this.onSwitch}>{(isSwitching) ? 'Switching...' : 'Switch'}</a>
        </div>
      </li>
    );
  }
}

EnsembleRow.propTypes = propTypes
EnsembleRow.defaultProps = defaultProps
export default EnsembleRow