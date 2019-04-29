import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  data: PropTypes.object,
  checked: PropTypes.bool,

  onClick: PropTypes.func,
}

const defaultProps = {
  name: "Item",
  data: {},
  checked: false,

  onClick() {}
}

class PermissionRow extends Component {
  render() {
    const { name, checked } = this.props
    return (
      <li role="button" className={classnames("member transition-all")}>
        {/*<button className="btn-add-large" onClick={(e)=>{this.props.onClick(this.props.index, this.props.data)}}>
          <i className="material-icons">add</i>
        </button>*/}
        <label className="control control--checkbox" style={{'margin':'11px 11px 12px'}}>{name}
          <input type="checkbox" onClick={(e)=>{this.props.onClick(this.props.index, !this.props.checked, this.props.data)}} checked={checked}/>
          <div className="control__indicator"></div>
        </label>
      </li>
    );
  }
}

PermissionRow.propTypes = propTypes
PermissionRow.defaultProps = defaultProps
export default PermissionRow
