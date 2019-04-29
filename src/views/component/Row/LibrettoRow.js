import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Libretto from '../Libretto.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  librettos: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class LibrettoRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {librettos, onClick} = this.props
    return librettos.map((value, index) => {
      return (
        <Libretto
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

LibrettoRow.propTypes = propTypes
LibrettoRow.defaultProps = defaultProps
export default LibrettoRow