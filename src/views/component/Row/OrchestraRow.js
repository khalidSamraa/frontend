import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Orchestra from '../Orchestra.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  orchestras: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class OrchestraRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {orchestras, onClick} = this.props
    return orchestras.map((value, index) => {
      return (
        <Orchestra
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

OrchestraRow.propTypes = propTypes
OrchestraRow.defaultProps = defaultProps
export default OrchestraRow