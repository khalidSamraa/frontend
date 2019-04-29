import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,

  active: PropTypes.bool,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clickable: PropTypes.bool,
  index: PropTypes.number,

  canSort: PropTypes.bool,

  onColumnClick: PropTypes.func,

  data: PropTypes.object,
}

const defaultProps = {
  name: 'Column',
  className: '',

  ascending: true,
  active: false,
  disabled: false,
  visible: true,
  clickable: true,
  index: -1,

  canSort: true,

  onColumnClick() {},

  data: null,
}

class TableHeaderItem extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onColumnClickHandler(e) {
    const {
      disabled,
      clickable,
      
      onColumnClick
    } = this.props
    if (!disabled && clickable){
      onColumnClick(e, this.props)
    }
  }

  renderSortNavigator() {
    const {active, ascending, canSort} = this.props;
    if (!canSort) {
      return (null)
    }
    let asc = '', desc = '';
    if (active) {
      if (ascending) {
        desc = 'sort-inactive'
      } else {
        asc = 'sort-inactive'
      }
    } else {
      asc = 'sort-inactive';
      desc = 'sort-inactive';
    }

    return (
      <div>
        <i className={"material-icons ascending " + asc}>arrow_drop_up</i>
        <i className={"material-icons descending " + desc}>arrow_drop_down</i>
      </div>
    )
  }

  render() {
    const {
      name,
      className,
      visible,
      disabled,
      clickable,
    } = this.props

    return (
      <div 
        className={classnames("noselect", className, {'hide': !visible}, {'clickable': clickable && !disabled}, {'column-disabled': disabled})}
        onClick={(e) => {this.onColumnClickHandler(e)}}
      >
        {name}
        {/* {this.renderSortNavigator()} */}
        <i className='sort-icon' />
      </div>
    );
  }
}

TableHeaderItem.propTypes = propTypes;
TableHeaderItem.defaultProps = defaultProps;
export default TableHeaderItem