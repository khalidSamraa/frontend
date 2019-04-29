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

class PurchasedAddRow extends Component {
  render() {
    const { name, data, onClick, unregistered } = this.props
    return (
      <li role="button" className={classnames("member transition-all")}>
        <button className="btn-add-large" onClick={(e)=>{this.props.onClick(this.props.index, this.props.data)}}>
          <i className="material-icons">add</i>
        </button>
        <div className={classnames("member-name", {"red-i": unregistered})}>
          <div role="button">{name}</div> 
        </div>
      </li>
    );
  }
}

PurchasedAddRow.propTypes = propTypes
PurchasedAddRow.defaultProps = defaultProps
export default PurchasedAddRow
