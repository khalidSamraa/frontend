import React, { Component } from 'react';

class ProductInfoFragment extends Component {
  getSubParams = (params, subParams, separator = '') => {
    if (subParams.length === 0) {
      return params;
    }
    let res = '';
    for (let i = 0; i < subParams.length; i++) {
      res += params[subParams[i]];
      if (i < subParams.length - 1) {
        res += separator;
      }
    }
    return res;
  };

  render() {
    const {
      name,
      params,
      subParams = [],
      separator = '',
      rowData
    } = this.props;
    if (rowData[params]) {
      return (
        <li>
          <label>{name}: </label>
          <span>
            {this.getSubParams(rowData[params], subParams, separator)}
          </span>
        </li>
      );
    }
    return null;
  }
}

export default ProductInfoFragment;
