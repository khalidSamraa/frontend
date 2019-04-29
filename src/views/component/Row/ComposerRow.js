import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Composer from '../Composer.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  composers: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class ComposerRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {composers, onClick} = this.props
    return composers.map((value, index) => {
      return (
        <Composer
          onClick={onClick}
          designType={2}
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

ComposerRow.propTypes = propTypes
ComposerRow.defaultProps = defaultProps
export default ComposerRow