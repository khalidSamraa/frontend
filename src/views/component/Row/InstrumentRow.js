import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instrument from '../Instrument.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  instruments: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class InstrumentRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {instruments, onClick} = this.props
    return instruments.map((value, index) => {
      return (
        <Instrument
          onClick={onClick}
          key={index}
          {...value}
        />
      )
    })
  }

  render() {
    const {letter} = this.props
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <div className="box">
          <ul>
            <li>
              <h2>{letter}</h2>
              {this.generateItems()}
            </li> 
          </ul>
        </div>
      </div>
    )
  }
}

InstrumentRow.propTypes = propTypes
InstrumentRow.defaultProps = defaultProps
export default InstrumentRow