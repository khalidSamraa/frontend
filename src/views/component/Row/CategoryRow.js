import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Category from '../Category.js'

const propTypes = {
  index: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  letter: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

const defaultProps = {
  onClick() {}
}

class CategoryRow extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  generateItems() {
    const {categories, onClick} = this.props
    return categories.map((value, index) => {
      return (
        <Category
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

CategoryRow.propTypes = propTypes
CategoryRow.defaultProps = defaultProps
export default CategoryRow