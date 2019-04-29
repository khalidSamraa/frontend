import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  data: PropTypes.object,
  unregistered: PropTypes.bool,

  onClick: PropTypes.func,
}

const defaultProps = {
  name: "Item",
  data: {},
  unregistered: false,

  onClick() {}
}

class PurchasedAssignedRow extends Component {
  render() {
    const { index, name, data, onClick, unregistered, loadingType, loadingIndex } = this.props

    return (
      <li role="button" className={classnames("member transition-all", {"loading-assign": loadingType && loadingIndex === index})} onClick={(e)=>{this.props.onClick(this.props.index, this.props.data)}}>
        <div className={classnames("member-name", {"red-i": unregistered})}>
          <div role="button">{name}</div>
        </div>
      </li>
    );
  }
}

PurchasedAssignedRow.propTypes = propTypes
PurchasedAssignedRow.defaultProps = defaultProps
export default PurchasedAssignedRow
