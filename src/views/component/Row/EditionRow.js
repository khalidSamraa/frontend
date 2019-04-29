import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edition from '../Edition.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  editions: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class EditionRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {editions, onClick} = this.props
    return editions.map((value, index) => {
      return (
        <Edition
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

EditionRow.propTypes = propTypes
EditionRow.defaultProps = defaultProps
export default EditionRow